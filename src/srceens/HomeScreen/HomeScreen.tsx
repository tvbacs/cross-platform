import ProfileScreen from '@/src/srceens/ProfileScreen/ProfileScreen';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import HomeContent from './HomeContent';
import Nav from './Nav';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');

  return (
        <View style={styles.home_container}>
          <Header />
    
          <View style={styles.content}>
            {activeTab === 'home' ? <HomeContent /> : <ProfileScreen />}
          </View>
    
          <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
  );
}

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingTop: 80,    
    paddingBottom: 80, 
  },
});