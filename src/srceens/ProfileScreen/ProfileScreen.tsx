import ButtonForm from '@/src/components/ButtonForm';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { getImageUri } from '@/src/utils/getImageUri';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Edit from '../Edit';

export default function ProfileScreen(){
    const { user, updateAuth } = useAuth(); 
    const [isShowEdit, setIsShowEdit] = useState(false);
    const handleLogout = async () => {
        try {
        await AsyncStorage.multiRemove(['token', 'user']);

        updateAuth(null,null);

        router.replace('/login');
        } catch (error) {
        console.error('Lỗi logout:', error);
        alert('Đăng xuất thất bại!');
        }
    };
    return (
        <View style={styles.profile_container}>
            <View style={styles.profile_header}>
                 <Text style={styles.title}>Xin chào {user?.username}</Text>
                 <View style={styles.wrapp_avt}>
                     <Image
                            source={{ uri: getImageUri(user?.image) }} 
                            style={styles.avt}
                             />
                 </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.info_header}>
                        <Text style={{fontFamily:'Poppins-Bold',fontSize:16}}>Infomation</Text>
                        <TouchableOpacity onPress={() => setIsShowEdit(true)}>
                            <Text style={{fontFamily:'Poppins-Bold',fontSize:14}}>Edit</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.infor_detail}>
                    <View style={styles.infor_item}>
                         <Ionicons
                            name={'person-outline'}
                            size={32}
                            color={'black'}
                        />
                        <View style={styles.infor_item_detail}>
                            <Text style={{fontWeight:600}}>Name</Text>
                            <Text style={{fontFamily:'Poppins-Italic'}}>{user?.username}</Text>
                        </View>
                    </View>
                    <View style={styles.horizon}/>
                     <View style={styles.infor_item}>
                         <Ionicons
                            name={'mail-outline'}
                            size={32}
                           color={'black'}
                        />
                        <View style={styles.infor_item_detail}>
                            <Text style={{fontWeight:600}}>Email</Text>
                            <Text style={{fontFamily:'Poppins-Italic'}}>{user?.email}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </View>
            <ButtonForm icon="" onPress={handleLogout} title='Logout' color={Colors.light.primary}/>
            {isShowEdit && <Edit isVisible={isShowEdit} onClose={() => setIsShowEdit(false)} user={user}  onUpdate={(updatedUser) => {
                updateAuth(updatedUser, null);
            setIsShowEdit(false);
          }}/> }
        </View>
        
    )
}
const styles = StyleSheet.create({
    profile_container:{
          flex: 1,
        backgroundColor: '#f2f4f5',
        padding:20,
        paddingTop:20,
        marginTop:20,
        flexDirection:"column",
        alignItems:'center'
    },
    profile_header:{
        width:'100%',
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:16,
        fontFamily:'Poppins-Italic'
    },
    wrapp_avt:{
        width:120,
        height:120,
        borderRadius:"100%",
        padding:4,
        backgroundColor:'white',
        marginTop:20,
        marginBottom:30,
        overflow:'hidden'
    },
    avt:{
        width:'99%',
        height:'99%',
        borderRadius:"100%",
        
    },
    info_container:{
        backgroundColor:'white',
        width:"100%",
        height:200,
        borderRadius:16,
        padding:20,
        marginBottom:20
    },
    info_header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
    },
    infor_detail:{
        flexDirection:'column',
        width:'100%'
    },
    infor_item:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
    },
    horizon:{
        borderBottomColor:'#ccc',
        borderBottomWidth:2,
        marginBottom:16,
        marginTop:16
    },
    infor_item_detail:{
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:10
    }
})