import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
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

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
      <StatusBar style='auto' />
    </ThemeProvider>
  )
}
