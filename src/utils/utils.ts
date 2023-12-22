import { Dimensions, PixelRatio, ToastAndroid } from 'react-native'
import Toast from 'react-native-toast-message'
const { height, width } = Dimensions.get('window')

export const calcSize = (size: any) => {
  const resolutionIPhone7 = Math.sqrt(320 * 320 + 568 * 568)
  const currentResolution = Math.sqrt(height * height + width * width)
  return (currentResolution / resolutionIPhone7) * size
}

export const calcSizeFont = (size: any) => {
  return PixelRatio.getPixelSizeForLayoutSize(size) / PixelRatio.get()
}

export const currencyMapper = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'GBP':
      return '£'
    case 'NIS':
      return '₪'
    default:
      return '₪'
  }
}

export const toast = ({ type, text1, text2 }: any) => {
  try {
    Toast.show({
      type,
      text1,
      text2,
    })
  } catch (error) {
    console.error('Error showing toast:', error)
  }
}

export const getRandomImage = () => {
  const width = 250
  const height = 200
  const randomId = Math.floor(Math.random() * 1000)

  return `https://picsum.photos/id/${randomId}/${width}/${height}`
}
