// src/components/Edit.tsx
import CONFIG from '@/src/constants/env';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { User } from '@/src/types/User';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface EditProps {
  isVisible: boolean;
  user:User | null,
  onClose: () => void;
  onUpdate?: (updatedUser: any) => void;
}

export default function Edit({ isVisible, onClose, user, onUpdate }: EditProps) {
  const { updateAuth } = useAuth();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!username.trim() || !email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/users/${user?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Cập nhật thất bại');
      }

      const updatedUser = { ...user!, username, email };

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      updateAuth(updatedUser, null);

      onUpdate?.(updatedUser);

      Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
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
    maxHeight: '80%',
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
    marginBottom: 20,
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