import React from 'react'
import {
  OpaqueColorValue,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native'

import { IconSymbol, IconSymbolName } from './IconSymbol'

type Props = ViewProps & {
  icon: IconSymbolName
  onPress: () => void
  size: number
  iconColor: string | OpaqueColorValue
}

const SCALE = 4

const IconButton: React.FC<Props> = ({
  onPress,
  size,
  icon,
  iconColor,
  style,
  ...rest
}) => {
  return (
    <View
      style={[{ width: size + SCALE, height: size + SCALE }, style]}
      {...rest}
    >
      <Pressable style={styles.button} onPress={onPress}>
        <IconSymbol size={size} name={icon} color={iconColor} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default IconButton
