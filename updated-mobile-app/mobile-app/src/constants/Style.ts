import { Dimensions } from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context'

export const RADIUS_BASE = 10

export const WINDOW_HEIGHT =
  initialWindowMetrics?.frame.height || Dimensions.get('window').height
export const WINDOW_WIDTH =
  initialWindowMetrics?.frame.width || Dimensions.get('window').width
export const IS_SCREEN_SMALL = WINDOW_WIDTH < 360
export const IS_SCREEN_MEDIUM = WINDOW_WIDTH >= 360 && WINDOW_WIDTH < 414
export const IS_SCREEN_LARGE = WINDOW_WIDTH >= 414
export const maxWords = 45
