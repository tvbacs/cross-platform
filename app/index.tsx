// app/(index).tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token  = await AsyncStorage.getItem('token');
        if (token ) {
          router.replace('/home'); 
        } else {
          router.replace('/login');
        }
      } catch (error) {
          console.error('Error checking login:', error);
      }
    };

    checkLogin();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}