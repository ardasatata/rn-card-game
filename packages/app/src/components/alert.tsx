import { Alert, Platform } from 'react-native'

const alertPolyfill = (title: any, description: any, options: { find: (arg0: { ({style}: { style: any }): boolean; ({style}: { style: any }): boolean }) => any }, extra?: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = window.confirm([title, description].filter(Boolean).join('\n'))

  if (result) {
    const confirmOption = options.find(({ style }) => style !== 'cancel')
    confirmOption && confirmOption.onPress()
  } else {
    const cancelOption = options.find(({ style }) => style === 'cancel')
    cancelOption && cancelOption.onPress()
  }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert