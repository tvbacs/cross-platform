import { Colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
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

  return (
    <View style={styles.heade_container}>
      <Text style={styles.logotext}>neo</Text>

      <View style={styles.header_right}>
        {currentUser?.username?.toLowerCase() === 'admin' && (
          <TouchableOpacity onPress={() => router.push("/add")}>
            <Ionicons
              style={styles.icon_right}
              name="add-circle-outline"
              size={35}
              color={'black'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heade_container: {
    width: '100%',
    minHeight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    top: 35,
    left: 0,
  },
  logotext: {
    fontSize: 28,
    color: Colors.light.primary,
    fontFamily: 'Poppins-BoldItalic'
  },
  header_right: {
    flexDirection: 'row',
    alignItems: "center"
  },
  icon_right: {
    marginLeft: 10
  }
});
