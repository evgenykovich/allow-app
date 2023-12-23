import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { PhoneNumberKeyboard } from '../PhoneNumberKeyboard'
import { calcSize, toast } from '../../utils/utils'
import { signUpLogin } from '../../utils/api'
import { useAppContext } from '../../contexts/AppContext'
import {
  phoneNumberText,
  signUpDetailsText,
  signUpText,
} from '../../utils/consts'

export const Signup = ({ navigation }: any) => {
  const [phonePrefix, setPhonePrefix] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const { personalDataData } = useAppContext()

  const handleSignUp = async () => {
    const fullPhoneNumber = phonePrefix + phoneNumber

    const validPrefixes = ['052', '053', '054', '055']
    if (!validPrefixes.includes(phonePrefix)) {
      toast({ type: 'error', text1: 'Error', text2: 'Invalid phone prefix' })
      return
    }

    if (fullPhoneNumber.length !== 10) {
      toast({ type: 'error', text1: 'Error', text2: 'Invalid phone number' })
      return
    }

    try {
      const res = await signUpLogin({ phone: fullPhoneNumber })
      personalDataData({ phone: fullPhoneNumber, parentId: res.parentId })
      navigation.navigate('Home')
    } catch (e) {
      toast({ type: 'error', text1: 'Error' })
      return
    }
  }

  const handleClick = (value: string) => {
    if (value === 'submit') {
      handleSignUp()
      return
    }

    if (value === 'delete') {
      if (phoneNumber.length > 0) {
        setPhoneNumber(phoneNumber.slice(0, -1))
      } else if (phonePrefix.length > 0) {
        setPhonePrefix(phonePrefix.slice(0, -1))
      }
    } else {
      if (phonePrefix.length < 3) {
        const newPhonePrefix = phonePrefix + value
        setPhonePrefix(newPhonePrefix)
      } else {
        const newPhoneNumber = phoneNumber + value
        setPhoneNumber(newPhoneNumber)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: calcSize(25), fontWeight: 'bold' }}>
          {signUpText}
        </Text>
      </View>

      <View>
        <View style={styles.phoneNumberTextContainer}>
          <Text style={{ fontSize: calcSize(16) }}>{phoneNumberText}</Text>
          <Text
            style={{
              fontSize: calcSize(20),
              color: '#ff3d3d',
              paddingLeft: calcSize(5),
            }}
          >
            *
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputShort]}
              maxLength={3}
              keyboardType="numeric"
              onChangeText={setPhonePrefix}
              value={phonePrefix}
            />
          </View>
          <View style={styles.border}></View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.longInput]}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              maxLength={7}
              value={phoneNumber}
            />
          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: calcSize(12), fontWeight: 'bold' }}>
          {signUpDetailsText}
        </Text>
      </View>
      <View>
        <PhoneNumberKeyboard handleClick={handleClick} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  phoneNumberTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  border: {
    borderColor: '#000',
    borderWidth: 1,
    width: calcSize(10),
    marginBottom: calcSize(18),
    marginRight: calcSize(10),
    marginLeft: calcSize(10),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: calcSize(20),
  },
  input: {
    height: calcSize(35),
    borderRadius: calcSize(5),
    padding: calcSize(5),
    fontSize: calcSize(18),
    textAlign: 'center',
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: calcSize(10),
    elevation: calcSize(2),
  },
  longInput: {
    width: calcSize(130),
  },
  inputShort: {
    width: calcSize(60),
  },
  submitBtn: {
    width: '80%',
    height: calcSize(40),
    backgroundColor: '#000',
    borderRadius: calcSize(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnTitle: {
    color: '#fff',
    marginBottom: calcSize(15),
  },
})
