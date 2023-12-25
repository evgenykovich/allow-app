import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { calcSize } from '../../utils/utils'
import { MonthleyWeekly } from '../../utils/types'

type RadioButtonProps = {
  options: string[]
  disabled?: boolean
  selectedOption?: string
  setSelectedOption?: (option: string) => void
}

export const RadioButton = ({
  options,
  selectedOption,
  disabled = false,
  setSelectedOption,
}: RadioButtonProps) => {
  return (
    <View style={[styles.allowensSelectContainer, disabled && styles.disabled]}>
      {options.map((option: string) => (
        <TouchableOpacity
          key={option}
          style={
            selectedOption === option
              ? styles.selectedRadioBtn
              : styles.radioBtn
          }
          onPress={() => setSelectedOption && setSelectedOption(option)}
        >
          <Text style={styles.btnText}>
            {MonthleyWeekly[option as keyof typeof MonthleyWeekly]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disabled: {
    pointerEvents: 'none',
  },
  allowensSelectContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedRadioBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f8bc23',
    borderRadius: calcSize(7),
    width: calcSize(125),
    height: calcSize(35),
    backgroundColor: '#fff',
  },
  btnText: {
    fontSize: calcSize(12),
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  radioBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: calcSize(7),
    width: calcSize(125),
    height: calcSize(35),
  },
})
