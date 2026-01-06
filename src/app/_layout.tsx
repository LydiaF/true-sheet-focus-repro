import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { ReanimatedTrueSheetProvider } from '@lodev09/react-native-true-sheet/reanimated'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function RootLayout() {
  return <GestureHandlerRootView>
    <ReanimatedTrueSheetProvider>

      <Stack screenOptions={{ headerTransparent: true, headerTintColor: 'white' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />

      </Stack>

    </ReanimatedTrueSheetProvider>
  </GestureHandlerRootView >
}
