import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useRef } from 'react'
import { ReanimatedTrueSheet } from '@lodev09/react-native-true-sheet/reanimated'
import type { TrueSheet } from '@lodev09/react-native-true-sheet'
import { PressableScale } from 'pressto'

export default function Repro() {
  const inputRef1 = useRef<TextInput>(null)
  const inputRef2 = useRef<TextInput>(null)
  const sheetRef = useRef<TrueSheet>(null)

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={() => sheetRef.current?.present()}
        style={{ padding: 20, backgroundColor: 'blue', borderRadius: 8 }}
      >
        <Text style={{ color: 'white' }}>Open Sheet</Text>
      </Pressable>

      <ReanimatedTrueSheet
        ref={sheetRef}
        name="test-sheet"
        detents={[0.5, 1]}
        initialDetentIndex={1}
      >
        <View style={{ flexGrow: 1, flexBasis: 0, padding: 20 }}>
          <TextInput
            ref={inputRef1}
            placeholder="Input 1"
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }}
          />
          <TextInput
            ref={inputRef2}
            placeholder="Input 2"
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }}
          />
          <PressableScale
            onPress={() => {
              inputRef2.current?.focus()
            }}
            style={{ padding: 15, backgroundColor: 'green', borderRadius: 8 }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Focus Input 2</Text>
          </PressableScale>
        </View>
      </ReanimatedTrueSheet>
    </ScrollView>
  )
}
