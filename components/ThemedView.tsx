import { View, type ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useThemeColor } from '@/hooks/useThemeColor'

type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  safeArea?: boolean
}

export const ThemedView = ({
  style,
  lightColor,
  darkColor,
  safeArea,
  ...otherProps
}: ThemedViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )

  if (safeArea) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[{ backgroundColor }, style]} {...otherProps} />
      </SafeAreaView>
    )
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
