import CONFIG from '@/src/constants/env';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { User } from '@/src/types/User';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface EditProps {
  isVisible: boolean;
  user: User | null;
  onClose: () => void;
  onUpdate?: (updatedUser: any) => void;
}

export default function Edit({ isVisible, onClose, user, onUpdate }: EditProps) {
  const { updateAuth } = useAuth();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [image, setImage] = useState(user?.image || null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Quyền bị từ chối', 'Bạn cần cho phép truy cập thư viện ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

 const handleSave = async () => {
  if (!username.trim() || !email.trim()) {
    Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  setLoading(true);
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);

    if (image && image !== user?.image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);
    }

    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${CONFIG.API_BASE_URL}/users/${user?._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Cập nhật thất bại');

    const currentUserStr = await AsyncStorage.getItem('user');
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    
    if (currentUser && currentUser._id === data._id) {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      const storedToken = await AsyncStorage.getItem('token');
      updateAuth(data, storedToken);
    }

    onUpdate?.(data);

    Alert.alert(' Thành công', 'Cập nhật thông tin thành công!');
    onClose();
  } catch (error: any) {
    console.error('Lỗi cập nhật:', error);
    Alert.alert('Lỗi', error.message || 'Không thể kết nối server');
  } finally {
    setLoading(false);
  }
};

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.info_header}>
            <TouchableOpacity onPress={onClose} disabled={loading}>
              <Ionicons name="close-outline" size={32} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.light.primary} />
              ) : (
                <Ionicons name="checkmark-outline" size={32} color={Colors.light.primary} />
              )}
            </TouchableOpacity>
          </View>

          {/* 🖼 Ảnh đại diện */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage} disabled={loading}>
              <Image
                source={{
                  uri:
                    image ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                }}
                style={styles.avatar}
              />
              <View style={styles.cameraIcon}>
                <Ionicons name="camera-outline" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infor_detail}>
            <View style={styles.infor_item}>
              <Ionicons name="person-outline" size={32} color="black" />
              <View style={styles.infor_item_detail}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Nhập Username"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={styles.horizon} />

            <View style={styles.infor_item}>
              <Ionicons name="mail-outline" size={32} color="black" />
              <View style={styles.infor_item_detail}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Nhập email"
                  keyboardType="email-address"
                  editable={!loading}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '85%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  info_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    padding: 6,
    borderRadius: 20,
  },
  infor_detail: {
    flexDirection: 'column',
    width: '100%',
  },
  infor_item: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infor_item_detail: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  horizon: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});
