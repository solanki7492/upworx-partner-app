import { AppProvider } from '@/contexts/app-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AppTheme } from '../theme/navigation';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {

  return (
    <ThemeProvider value={AppTheme}>
      <AuthProvider>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false, gestureEnabled: false, }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(lead)" options={{ headerShown: false }} />
            <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
