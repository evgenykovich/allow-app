import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioButton } from '../RadioButton'
import { useAppContext } from '../../contexts/AppContext'
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
  selectOptions,
} from '../../utils/consts'

export const AddChild = ({ navigation, route }: any) => {
  const child = route.params ? route.params.child : undefined
  const isWeeklyChild = child ? child.isWeekly : false
  const isWeekly = isWeeklyChild ? 'weekly' : 'monthly'
  const [selectedOption, setSelectedOption] = useState(isWeekly)
  const updatedBalance =
    child && child?.balance ? child?.balance : child?.startBalance
  const [name, setName] = useState(child ? child.fName : '')
  const [lastName, setLastName] = useState(child ? child.lName : '')
  const [allowensBalance, setAllowensBalance] = useState(
    child ? String(updatedBalance) : ''
  )
  const [allowens, setAllowens] = useState(
    child ? String(child.allowanceAmount) : ''
  )
  const [selectedDate, setBirthday] = useState<Date>(
    child ? new Date(child.bDay) : new Date()
  )
  const [showDatePicker, setShow] = useState(false)
  const currentDate = selectedDate

  const { sharedData, setSharedData, personalData } = useAppContext()

  const submitForm = async () => {
    const newChild = {
      fName: name,
      lName: lastName,
      bDay: selectedDate,
      allowanceAmount: Number(allowens),
      isWeekly: selectedOption === 'weekly' ? true : false,
      startBalance: Number(allowensBalance),
      imageId: child && child.imageId ? child.imageId : getRandomImage(),
      parentId: personalData.parentId,
      ...(child && child.id
        ? { id: child.id, balance: Number(allowensBalance) }
        : {}),
    }

    try {
      const response = await addEditChild(newChild)

      const id = child && child.id ? child.id : response.childId

      if (child && child.id) {
        setSharedData(
          sharedData.map((item: { id: number }) =>
            item.id === id ? { ...newChild, id } : item
          )
        )
      } else {
        setSharedData([...sharedData, { ...newChild, id }])
      }
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
          <RadioButton
            options={selectOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
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
    textAlign: 'right',
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
