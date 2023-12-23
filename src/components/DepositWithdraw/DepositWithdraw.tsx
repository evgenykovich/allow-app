import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, I18nManager } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ActionType } from '../ChildDetails'
import {
  currencyTitle,
  depositText,
  depositWithdrawDescriptionText,
  reasonDescriptionText,
  withdrawText,
  howMuchToWithdrawText,
  howMuchToDepositText,
  detailsText,
  amountSuccessfullyDepositedText,
  amountSuccessfullyWithdrawnText,
} from '../../utils/consts'
import { calcSize, currencyMapper, toast } from '../../utils/utils'
import { getBalance, handleDepositOrWithdraw } from '../../utils/api'
import { useAppContext } from '../../contexts/AppContext'

enum ActionTypeTranslation {
  withdraw = withdrawText,
  deposit = depositText,
}

export const DepositWithdraw = ({ navigation, route }: any) => {
  const { type, child } = route.params
  const { currency } = child
  const [currentBalance, setBalance] = useState()
  const [formData, setFormData] = useState({
    description: '',
    childId: child.id,
    sum: '',
  })

  const { setSharedData } = useAppContext()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance(child.id)
        setBalance(response)
      } catch (e) {
        console.log('error', e)
      }
    }
    fetchBalance()
  }, [])

  const handleAction = async () => {
    if (!formData.sum) {
      return
    }
    try {
      const data = {
        ...formData,
        sum:
          type === ActionType.deposit
            ? Number(formData.sum)
            : -Number(formData.sum),
      }

      const response = await handleDepositOrWithdraw(data)
      console.log('response', response)

      if (response.error.length) {
        toast({
          type: 'error',
          text1: 'Error',
          text2: response.error[0].errorMessage,
        })
        return
      }
      setSharedData((prev: any) => {
        const newSharedData = prev.map((item: any) => {
          if (item.id === child.id) {
            return {
              ...item,
              balance: response.balance,
            }
          }
          return item
        })
        return newSharedData
      })

      const textFormatted =
        type === ActionType.deposit
          ? amountSuccessfullyDepositedText
          : amountSuccessfullyWithdrawnText

      toast({
        type: 'success',
        text1: 'Success',
        text2: `${formData.sum} ${textFormatted}`,
      })
      navigation.navigate('Home')
    } catch (e) {
      toast({ type: 'error', text1: 'Error' })
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View
          style={[
            styles.titleContainer,
            ActionType.deposit === type
              ? styles.depositBtn
              : styles.withdrawBtn,
          ]}
        >
          <Text style={styles.titleText}>
            {ActionTypeTranslation[type as keyof typeof ActionTypeTranslation]}
          </Text>
        </View>
        <View>
          <View style={styles.detailsContainer}>
            <View style={styles.currencyTypeContainer}>
              <Text style={styles.currencyIcon}>
                {currencyMapper(currency || '')}
              </Text>
              <Text style={styles.currencyTitle}>{currentBalance}</Text>
            </View>
            <View>
              <Text style={styles.currencyTitle}>{currencyTitle}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <View>
          <Text style={{ fontSize: calcSize(14), marginBottom: calcSize(4) }}>
            {depositWithdrawDescriptionText}
          </Text>
          <TextInput
            value={formData.sum}
            onChangeText={(text) => setFormData({ ...formData, sum: text })}
            keyboardType="numeric"
            style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
            placeholder={
              ActionType.deposit === type
                ? howMuchToDepositText
                : howMuchToWithdrawText
            }
          />
        </View>
        <View>
          <Text style={{ fontSize: calcSize(14), marginBottom: calcSize(4) }}>
            {detailsText}
          </Text>
          <TextInput
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            value={formData.description}
            style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
            placeholder={reasonDescriptionText}
            multiline={true}
            numberOfLines={5}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleAction}>
          <Text style={styles.submitBtnText}>
            {ActionTypeTranslation[type as keyof typeof ActionTypeTranslation]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: calcSize(10),
    paddingLeft: calcSize(10),
    paddingRight: calcSize(10),
    paddingBottom: calcSize(10),
  },
  input: {
    width: '100%',
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
  titleText: {
    fontSize: calcSize(24),
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: calcSize(10),
    marginTop: calcSize(10),
    borderWidth: 2,
    padding: calcSize(3),
    borderRadius: calcSize(10),
  },
  withdrawBtn: {
    borderColor: '#f66',
  },
  depositBtn: {
    borderColor: '#2c9e68',
  },
  currencyTitle: {
    fontSize: calcSize(18),
    marginLeft: calcSize(5),
  },
  currencyIcon: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: calcSize(20),
    borderRadius: calcSize(50),
    borderWidth: calcSize(1),
    borderColor: '#000',
    fontSize: calcSize(14),
    textAlign: 'center',
  },
  currencyTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: calcSize(10),
    elevation: calcSize(2),
    borderRadius: calcSize(10),
    padding: calcSize(5),
    paddingLeft: calcSize(15),
    paddingRight: calcSize(15),
    marginTop: calcSize(10),
  },
})
