import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { addEditChild } from '../../utils/api'
import { calcSize, getRandomImage } from '../../utils/utils'
import {
  addChildText,
  nameText,
  allowensBalanceText,
  submitText,
  lastNameText,
  birthDayDateText,
  allowensText,
} from '../../utils/consts'
import { useAppContext } from '../../contexts/AppContext'

export const AddChild = ({ navigation }: any) => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [allowensBalance, setAllowensBalance] = useState('')
  const [allowens, setAllowens] = useState('')
  const [selectedDate, setBirthday] = useState<Date>()
  const [showDatePicker, setShow] = useState(false)
  const currentDate = selectedDate

  const { sharedData, setSharedData, personalData } = useAppContext()

  const submitForm = async () => {
    const newChild = {
      fName: name,
      lName: lastName,
      bDay: selectedDate,
      allowanceAmount: Number(allowens),
      isWeekly: true,
      startBalance: Number(allowensBalance),
      imageId: getRandomImage(),
      parentId: personalData.parentId,
    }

    try {
      const response = await addEditChild(newChild)
      console.log('response', response)

      setSharedData([...sharedData, newChild])
      navigation.navigate('Home')
    } catch (e) {
      console.log('error', e)
    }
  }

  const onChangeBirthday = (event: any, selectedDate: any) => {
    setShow(false)
    setBirthday(selectedDate)
  }

  const showDatePickerModal = () => {
    setShow(true)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>{addChildText}</Text>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            placeholder={nameText}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder={lastNameText}
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder={birthDayDateText}
            value={currentDate ? currentDate.toLocaleDateString() : ''}
            onTouchStart={showDatePickerModal}
            underlineColorAndroid="transparent"
          />

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder={allowensBalanceText}
            value={allowensBalance}
            onChangeText={setAllowensBalance}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder={allowensText}
            value={allowens}
            onChangeText={setAllowens}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={submitForm}>
        <Text style={styles.submitBtnText}>{submitText}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={currentDate || new Date()}
          onChange={onChangeBirthday}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    padding: calcSize(15),
  },
  title: {
    fontSize: calcSize(20),
    fontWeight: 'bold',
    marginBottom: calcSize(20),
  },
  input: {
    height: calcSize(45),
    borderRadius: calcSize(5),
    padding: calcSize(10),
    fontSize: calcSize(18),
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: calcSize(10),
    elevation: calcSize(2),
    marginBottom: calcSize(20),
  },
  submitBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ba7b8',
    padding: calcSize(10),
    borderRadius: calcSize(5),
    width: calcSize(100),
    marginTop: calcSize(50),
  },
  submitBtnText: {
    color: '#fff',
    fontSize: calcSize(14),
    fontWeight: 'bold',
  },
})
