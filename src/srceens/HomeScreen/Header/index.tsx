import { Colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Header(){
    return(
        <View style ={styles.heade_container}>
             <Text style={styles.logotext}>neo</Text>
            
            <View style={styles.header_right}>
                 <TouchableOpacity onPress={()=> router.push("/add")}>
                   <Ionicons style ={styles.icon_right} name="add-circle-outline" size={35} color={'black'} />
                </TouchableOpacity>
        
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    heade_container:{
        width:'100%',
        minHeight:50,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:16,
        paddingRight:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        position:'absolute',
        top:35,
        left:0,
    },
    logo: {
    width: 30,
    height: 30,
  },
  logotext:{
    fontSize:28,
    color: Colors.light.primary,
    fontFamily:'Poppins-BoldItalic'
  },
  header_right:{
    flexDirection:'row',
    alignItems:"center"
  },
  icon_right:{
    marginLeft:10
  }
})