import ButtonForm from '@/src/components/ButtonForm';
import CONFIG from '@/src/constants/env';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputForm from '../../components/InputForm';
import { Colors } from '../../constants/theme';
const images = {
  logo: require('../../assets/images/neologrm.png'),
  splash: require('../../assets/images/splash-icon.png'),
};

function SignUpScreen() {
    const [username,setUsername]  = useState('');
    const [password,setPassword]  = useState('');
    const [email,setEmail]  = useState('');
    const [secure, setSecure] = useState(true);
    const router = useRouter();

  const toggleSecure = () => setSecure(prev => !prev);

   async function handleSubmit(){
    if(!username || !email || !password ){
      alert('Vui lòng nhập đầy đủ thông tin')
    }
      try {
        const response = fetch(`${CONFIG.API_BASE_URL}/auth/signup`,{
         method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username, 
                email: email,
                password:password,
            }),
        });
        const data  = await (await response).json();
        if ((await response).ok) {
            alert(data.message);
                router.replace('/login');
        }else {
            alert(data.error || "Đăng ký thất bại!");
          }
      } catch (error) {
              alert("Không thể kết nối đến server!");
      } 
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.header__text}>Neo.New.</Text>
      </View>
      <Text style={styles.title}>Start with new Account</Text>
      {/* form */}
      <View style={styles.form}>
           <View style={styles.form_group}>
                <Text style={styles.lable}>Username</Text>
              <View style={styles.form_row}>
                   <InputForm 
                    placeholder="Username" 
                    value={username}
                    onChangeText={setUsername}
                    />
              </View>
           </View>
            <View style={styles.form_group}>
                <Text style={styles.lable}>email</Text>
              <View style={styles.form_row}>
                   <InputForm 
                    placeholder="Email" 
                    value={email}
                    onChangeText={setEmail}
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
          

           {/* button */}
           <ButtonForm title="Sign up" icon={false} color={ Colors.light.primary}  onPress={handleSubmit}/>
           <View style ={styles.horiz}/>
            <ButtonForm title="Or sign up with Google" icon="google" color="#333333"  onPress={handleSubmit}/>

            {/* redirect */}
            <View style ={styles.redicect}>
                 <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style ={{color: Colors.light.primary,marginLeft:10,fontFamily:'Poppins-BoldItalic'}}>Login here</Text>
                </TouchableOpacity> 
            </View>
      </View>
    </View>
  );
}

export default SignUpScreen;

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