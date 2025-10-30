import ButtonForm from '@/src/components/ButtonForm';
import { useAuth } from '@/src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import InputForm from '../../components/InputForm';
import CONFIG from '../../constants/env';
import { Colors } from '../../constants/theme';
const images = {
  logo: require('../../assets/images/neologrm.png'),
  splash: require('../../assets/images/splash-icon.png'),
};

function LoginScreen() {
    const [username,setUsername]  = useState('');
    const [password,setPassword]  = useState('');
    const [secure, setSecure] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const { updateAuth } = useAuth();
    const router = useRouter();

   const handleSubmit = async () => {
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: username, 
                password: password,
            }),
            });
            const data = await response.json();
            if (response.ok) {
            alert("Đăng nhập thành công!");
            // Lưu vào AsyncStorage
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));

            // Cập nhật Context
            updateAuth(data.user, data.token);
            router.replace('/home');
            } else {
            alert(data.error || "Đăng nhập thất bại!");
            }
        } catch (error) {
            alert("Không thể kết nối đến server!");
        }
        };

    const toggleSwitch = () => setIsEnabled(prev => !prev);
    const toggleSecure = () => setSecure(prev => !prev);

     return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.header__text}>Neo.New.</Text>
        </View>
        <Text style={styles.title}>Nice to see you again</Text>
        {/* form */}
        <View style={styles.form}>
            <View style={styles.form_group}>
                    <Text style={styles.lable}>Login with</Text>
                <View style={styles.form_row}>
                    <InputForm 
                        placeholder="Username or email" 
                        value={username}
                        onChangeText={setUsername}
                        />
                </View>
            </View>
                <View style={styles.form_group}>
                    <Text  style={styles.lable}>Password</Text>
                    <View style={styles.form_row}>
                        <InputForm 
                        placeholder="Enter password" 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry ={secure}
                        />
                        <TouchableOpacity
                        onPress={toggleSecure}
                        style={styles.iconButton}
                        accessibilityLabel={secure ? "Show password" : "Hide password"}
                        accessibilityRole="button"
                    >
                        <Ionicons
                        name={secure ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#333"
                        />
                    </TouchableOpacity>
                    </View>
                </View>

                {/* remember */}
            <View style={styles.under_form}>
                    <View style={styles.remember_row}>
                        <Switch
                            trackColor={{ false: '#F2F2F2', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#fff' : '#FFF'}
                            ios_backgroundColor="#f2F2F2"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={styles.switch}
                        />
                        <Text style={styles.remember_text}>Remember me</Text>
                    </View>
                    <Text style={[styles.forgot_text, { color: Colors.light.primary }]}>
                    Forgot password?
                    </Text>
            </View>

            {/* button */}
            <ButtonForm title="Sign in" icon={false} color={ Colors.light.primary}  onPress={handleSubmit}/>
            <View style ={styles.horiz}/>
                <ButtonForm title="Or sign in with Google" icon="google" color="#333333"  onPress={handleSubmit}/>

                {/* redirect */}
                <View style ={styles.redicect}>
                    <Text style ={{color:'black'}}>Dont have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style ={{color: Colors.light.primary,marginLeft:10,fontFamily:'Poppins-BoldItalic'}}>Sign up Now</Text>
                </TouchableOpacity>            
        </View>
        </View>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding:30,
    paddingTop:60
  },
  header: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 60,
    height: 60,
  },
  header__text: {
    fontFamily: 'Poppins-BoldItalic',
    fontSize: 18,
  },
  title:{
    fontSize:20,
    fontFamily: 'Poppins-Bold',
    marginTop:30,
    marginBottom:20,
  },
  form_group:{

  },
  form_row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingRight: 20,
    paddingLeft: 20,
    height: 56,
    marginBottom:20
  },
    iconButton: {
    // padding: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form:{
    width:'100%',
  },
  lable:{
    fontSize:12,
    fontWeight:'600',
    color:'#999',
    marginBottom:6
  },
  remember_row:{
    // width:"100%",
    height:30,
    flexDirection:'row',
    alignItems:'center'
  },
  remember_text:{
    marginLeft:10,
    fontWeight:'400',
    fontFamily:'Poppins-LightItalic',
    fontSize:12
  },
  under_form:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  switch:{
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  forgot_text:{
    fontSize:12,
    fontWeight:'500'
  },
  horiz:{
    width:'100%',
    height:2,
    backgroundColor:'#f6f6f6',
    marginTop:30,
  },
  redicect:{
    width:'100%',
    justifyContent:'center',
    alignItems:"center",
    flexDirection:'row',
    marginTop:30
  }
});