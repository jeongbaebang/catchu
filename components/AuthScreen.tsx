import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { Image } from 'expo-image'

import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { mainColor } from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface InputField {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric'
  returnKeyType?: 'next' | 'done'
}

interface AuthScreenProps {
  title: string
  subtitle: string
  inputFields: InputField[]
  primaryButtonText: string
  primaryButtonAction: () => void
  isPrimaryButtonDisabled?: boolean
  secondaryText: string
  secondaryLinkText: string
  secondaryLinkAction: () => void
}

/**
 * 로그인/회원가입 재사용 가능한 컴포넌트
 */
export const AuthScreen: React.FC<AuthScreenProps> = ({
  title,
  subtitle,
  inputFields,
  primaryButtonText,
  primaryButtonAction,
  isPrimaryButtonDisabled = false,
  secondaryText,
  secondaryLinkText,
  secondaryLinkAction,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={[{ flex: 1, paddingBottom: insets.top }]}
        >
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/draw_cat.png')}
                style={styles.logoImage}
              />
              <ThemedText style={styles.welcomeTitle}>{title}</ThemedText>
              <ThemedText style={styles.welcomeSubtitle}>{subtitle}</ThemedText>
            </View>
          </View>
          <View style={styles.formSection}>
            {inputFields.map((field, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor='#6B7280'
                  value={field.value}
                  onChangeText={field.onChangeText}
                  secureTextEntry={field.secureTextEntry}
                  keyboardType={field.keyboardType || 'default'}
                  returnKeyType={
                    field.returnKeyType ||
                    (index === inputFields.length - 1 ? 'done' : 'next')
                  }
                  style={styles.textInput}
                />
              </View>
            ))}
            <Pressable
              style={[
                styles.primaryButton,
                isPrimaryButtonDisabled && styles.primaryButtonDisabled,
              ]}
              onPress={primaryButtonAction}
              disabled={isPrimaryButtonDisabled}
            >
              <ThemedText
                style={[
                  styles.primaryButtonText,
                  isPrimaryButtonDisabled && styles.primaryButtonTextDisabled,
                ]}
              >
                {primaryButtonText}
              </ThemedText>
            </Pressable>

            <View style={styles.secondaryContainer}>
              <ThemedText>{secondaryText}</ThemedText>
              <Pressable onPress={secondaryLinkAction}>
                <ThemedText style={styles.secondaryLinkText}>
                  {secondaryLinkText}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logoSection: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 124,
    height: 100,
    transform: [{ translateY: 5 }],
  },
  welcomeTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  formSection: {
    flex: 0.45,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '100%',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: mainColor,
    minHeight: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  primaryButtonTextDisabled: {
    color: '#9CA3AF',
  },
  secondaryContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  secondaryLinkText: {
    fontWeight: '600',
    color: mainColor,
    transform: [{ translateY: -2 }],
  },
})
