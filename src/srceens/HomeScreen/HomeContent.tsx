import { User } from '@/src/types/User';
import { getImageUri } from '@/src/utils/getImageUri';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CONFIG from '../../constants/env';
import Edit from '../Edit';

export default function HomeContent() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    };
    getUser();
  }, []);


const handleEdit = (user: User) => {
  setEditUser(user);
  setShowEdit(true);
};

const handleDelete = async (id: string) => {
  Alert.alert(
    'Xóa người dùng',
    'Bạn có chắc chắn muốn xóa?',
    [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            const res = await fetch(`${CONFIG.API_BASE_URL}/users/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              setUsers(prev => prev.filter(u => u._id !== id));
              Alert.alert('Thành công', 'Đã xóa!');
            } else {
              throw new Error('Xóa thất bại');
            }
          } catch (error: any) {
            Alert.alert('Lỗi', error.message);
          }
        },
      },
    ]
  );
};
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${CONFIG.API_BASE_URL}/users`);

        if (!response.ok) throw new Error('Lỗi mạng');

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  const filteredUsers = useMemo(() => {
    let result = users.filter(user => user._id !== currentUser?._id);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.username?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [users, searchQuery, currentUser]);
  

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.text}>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
   
        <View style={styles.home_container}>
            <View style ={styles.home_header}>
                <Text style={styles.home_title}>DashBoard</Text>
                <View style={styles.home_header_wrapp_input}>
                    <TouchableOpacity>
                      <Ionicons style ={styles.icon_search} name="search-outline" size={35} color={'black'} />
                     </TouchableOpacity>
                    <TextInput
                        style={styles.home_header_input}
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChangeText={setSearchQuery} 
                        placeholderTextColor={"#333"}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                    />
                    {searchQuery ? (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                        <Ionicons name="close-circle" size={20} color="#aaa" />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <View style={styles.userCard_info}>
                  <Image
                    source={{ uri: getImageUri(item.image) }}
                    style={styles.avatar}
                  />

                  <View style={styles.item_infor}>
                    <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.username}</Text>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 10 }}>{item.email}</Text>
                  </View>
                </View>

                <View style={styles.userCard_btns}>
                  {/* Chỉ hiển thị nút SỬA nếu là admin hoặc chính user đó */}
                  {(currentUser?.username?.toLowerCase() === 'admin' ||
                    currentUser?._id === item._id) && (
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Ionicons name="create-outline" size={20} color="#007AFF" />
                    </TouchableOpacity>
                  )}

                  {/* Nút XÓA chỉ hiển thị nếu là admin và không xóa tài khoản admin */}
                  {currentUser?.username?.toLowerCase() === 'admin' &&
                    !(item.username?.toLowerCase() === 'admin' ||
                      item.email?.toLowerCase().includes('admin')) && (
                      <TouchableOpacity onPress={() => handleDelete(item._id)}>
                        <Ionicons name="close-outline" size={20} color="#FF3B30" />
                      </TouchableOpacity>
                    )}
                </View>
              </View>
            )}
            contentContainerStyle={styles.list}
          />


          {showEdit && (
            <Edit
                isVisible={showEdit}
                user={editUser}
                onClose={() => setShowEdit(false)}
            />
            )}
        </View>
  );
}

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection:'row'
  },
  username: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  icon_search:{

  },
  home_header:{
    width:'100%',
    flexDirection:'column',
    padding:20,

  },
  home_title:{
    fontSize:26,
    fontFamily:'Poppins-Bold'
  },
  home_header_wrapp_input:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    width:'100%',
    borderRadius:10,
    borderColor:'#333',
    borderWidth:0.5,
    marginTop:10,
    paddingRight:14,
    paddingLeft:14,
    paddingTop:6,
    paddingBottom:6
  },
  home_header_input:{
    flex:1,
    marginLeft:6
  },
  userCard_info:{
    flexDirection:'row',
    width:'50%',
    overflowX:'hidden'
  },
    avatar:{
        width:40,
        height:40,
        borderRadius:'100%',
        marginRight:12
    },
   userCard_btns:{
       flex:1,
       flexDirection:'row',
       justifyContent:'space-around',
       alignItems:'center'
    },
    item_infor:{
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    clearButton: { padding: 4 },
});