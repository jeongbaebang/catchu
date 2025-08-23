/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FF4757'; // 캐치유 메인 레드
const tintColorDark = '#FF6B7A'; // 밝은 핑크레드

export const Colors = {
  light: {
    text: '#2F3542', // 진한 네이비 (가독성 좋은 텍스트)
    background: '#F8F9FA', // 깔끔한 연한 회색 배경
    tint: tintColorLight, // 캐치유 메인 레드
    icon: '#57606F', // 중간 회색 (아이콘)
    tabIconDefault: '#A4B0BE', // 연한 회색 (비활성 탭)
    tabIconSelected: tintColorLight, // 메인 레드 (활성 탭)
  },
  dark: {
    text: '#F8F9FA', // 밝은 텍스트
    background: '#2F3542', // 진한 배경
    tint: tintColorDark, // 밝은 핑크레드
    icon: '#A4B0BE', // 중간 회색 아이콘
    tabIconDefault: '#687076', // 어두운 회색 (비활성 탭)
    tabIconSelected: tintColorDark, // 밝은 핑크레드 (활성 탭)
  },
};
