import { AuthProvider } from '@/src/context/AuthContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Ngăn splash screen tự động ẩn
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Black weights
    'Poppins-Black': require('../src/assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../src/assets/fonts/Poppins-BlackItalic.ttf'),
    
    // ExtraBold weights
    'Poppins-ExtraBold': require('../src/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../src/assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    
    // Bold weights
    'Poppins-Bold': require('../src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../src/assets/fonts/Poppins-BoldItalic.ttf'),
    
    // SemiBold weights
    'Poppins-SemiBold': require('../src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../src/assets/fonts/Poppins-SemiBoldItalic.ttf'),
    
    // Medium weights
    'Poppins-Medium': require('../src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../src/assets/fonts/Poppins-MediumItalic.ttf'),
    
    // Regular weights
    'Poppins-Regular': require('../src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../src/assets/fonts/Poppins-Italic.ttf'),
    
    // Light weights
    'Poppins-Light': require('../src/assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../src/assets/fonts/Poppins-LightItalic.ttf'),
    
    // ExtraLight weights
    'Poppins-ExtraLight': require('../src/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../src/assets/fonts/Poppins-ExtraLightItalic.ttf'),
    
    // Thin weights
    'Poppins-Thin': require('../src/assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../src/assets/fonts/Poppins-ThinItalic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
  <SafeAreaProvider>
     <AuthProvider>
      <StatusBar
          style="dark"          
          translucent={true}     
          backgroundColor="transparent"
        />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="login" />
        </Stack>
     </AuthProvider>
  </SafeAreaProvider>
  );
}