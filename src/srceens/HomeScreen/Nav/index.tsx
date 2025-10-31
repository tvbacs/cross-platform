// Nav.tsx
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { getImageUri } from '@/src/utils/getImageUri';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const images = {
  logo: require('@/src/assets/images/neologrm.png'),
  splash: require('@/src/assets/images/splash-icon.png'),
};

interface NavProps {
  activeTab: 'home' | 'profile';
  setActiveTab: (tab: 'home' | 'profile') => void;
}

export default function Nav({ activeTab, setActiveTab }: NavProps) {
  const { user } = useAuth();
  return (
    <View style={styles.nav_container}>
      <TouchableOpacity
        onPress={() => setActiveTab('home')}
        style={[styles.btn, activeTab === 'home' && styles.activeBtn]}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={32}
          color={activeTab === 'home' ? Colors.light.primary : '#666'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab('profile')}
        style={[styles.btn, activeTab === 'profile' && styles.activeBtn]}
      >
       <Image
             source={{ uri: getImageUri(user?.image) }} 
            style={styles.avatar}
          />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav_container: {
    width: '100%',
    height: 80,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  activeBtn: {
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});