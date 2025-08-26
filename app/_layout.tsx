import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { useEffect } from 'react'
import { SessionProvider } from '@/context/auth'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded, error] = useFonts({
    CormorantGaramondBold: require('../assets/fonts/CormorantGaramond-Bold.ttf'),
    CormorantGaramondBoldItalic: require('../assets/fonts/CormorantGaramond-BoldItalic.ttf'),
    CormorantGaramondItalic: require('../assets/fonts/CormorantGaramond-Italic.ttf'),
    CormorantGaramondLight: require('../assets/fonts/CormorantGaramond-Light.ttf'),
    CormorantGaramondLightItalic: require('../assets/fonts/CormorantGaramond-LightItalic.ttf'),
    CormorantGaramondMedium: require('../assets/fonts/CormorantGaramond-Medium.ttf'),
    CormorantGaramondMediumItalic: require('../assets/fonts/CormorantGaramond-MediumItalic.ttf'),
    CormorantGaramondRegular: require('../assets/fonts/CormorantGaramond-Regular.ttf'),
    CormorantGaramondSemiBold: require('../assets/fonts/CormorantGaramond-SemiBold.ttf'),
    CormorantGaramondSemiBoldItalic: require('../assets/fonts/CormorantGaramond-SemiBoldItalic.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='sign-in' options={{ headerShown: false }} />
          <Stack.Screen name='sign-up' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </SessionProvider>
  )
}
