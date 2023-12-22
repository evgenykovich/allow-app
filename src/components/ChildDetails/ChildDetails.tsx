import { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HistoryTableContainer } from '../HistoryTable'
import { calcSize, currencyMapper } from '../../utils/utils'
import {
  withdrawText,
  currencyTitle,
  depositText,
  depositDetailsText,
  monthleyText,
  weeklyText,
  sumText,
  historyText,
} from '../../utils/consts'

export const ChildDetails = ({ route }: any) => {
  const { child } = route.params
  const { fName, startBalance, currency, isWeekly, imageId, allowanceAmount } =
    child
  const [text, onAllowensText] = useState(startBalance)
  const [selectedOption, setSelectedOption] = useState(
    isWeekly ? 'weekly' : 'monthly'
  )

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.innerContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: imageId,
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{fName}</Text>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.currencyTypeContainer}>
              <Text style={styles.currencyIcon}>
                {currencyMapper(currency || '')}
              </Text>
              <Text style={styles.currencyTitle}>{startBalance}</Text>
            </View>
            <View>
              <Text style={styles.currencyTitle}>{currencyTitle}</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionBtn, styles.withdrawBtn]}>
              <Text>{withdrawText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.depositBtn]}>
              <Text>{depositText}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.allowensTypeContainer}>
            <View style={{ marginBottom: calcSize(10) }}>
              <Text style={{ fontSize: calcSize(20), fontWeight: 'bold' }}>
                {depositDetailsText}
              </Text>
            </View>
            <View style={styles.allowensSelectContainer}>
              <TouchableOpacity
                style={
                  selectedOption === 'monthly'
                    ? styles.selectedRadioBtn
                    : styles.radioBtn
                }
                onPress={() => setSelectedOption('monthly')}
              >
                <Text style={styles.btnText}>{monthleyText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedOption === 'weekly'
                    ? styles.selectedRadioBtn
                    : styles.radioBtn
                }
                onPress={() => setSelectedOption('weekly')}
              >
                <Text style={styles.btnText}>{weeklyText}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: calcSize(10) }}>
              <TouchableOpacity
                style={[
                  styles.radioBtn,
                  { display: 'flex', flexDirection: 'row' },
                ]}
              >
                <Text style={styles.btnText}>
                  {currencyMapper(currency || '')}
                </Text>
                <Text style={styles.btnText}>{allowanceAmount}</Text>
                <Text style={[styles.btnText, { marginLeft: calcSize(5) }]}>
                  {sumText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <Text style={{ fontSize: calcSize(20), fontWeight: 'bold' }}>
              {historyText}
            </Text>
          </View>
          <View>
            <HistoryTableContainer />
          </View>
        </View>
      </View>
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.addChildBtn}>
          <Text style={styles.addChildBtnTitle}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,

    padding: calcSize(10),
  },
  selectedRadioBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f8bc23',
    borderRadius: calcSize(7),
    width: calcSize(100),
    height: calcSize(30),
    marginRight: calcSize(10),
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
    width: calcSize(100),
    height: calcSize(30),
    marginRight: calcSize(10),
  },
  allowensSelectContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  allowensTypeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: calcSize(10),
    padding: calcSize(10),
    backgroundColor: '#f6f6f6',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: calcSize(10),
    elevation: calcSize(2),
  },
  actionBtn: {
    borderWidth: 2,
    padding: calcSize(3),
    borderRadius: calcSize(10),
    width: calcSize(50),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawBtn: {
    borderColor: '#f66',
    marginRight: calcSize(10),
  },
  depositBtn: {
    borderColor: '#2c9e68',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: calcSize(10),
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
    marginRight: calcSize(8),
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
  currency: {
    fontSize: calcSize(18),
  },
  currencyTitle: {
    fontSize: calcSize(18),
    marginLeft: calcSize(5),
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: calcSize(10),
  },
  title: {
    fontSize: calcSize(12),
    fontStyle: 'italic',
    padding: calcSize(1),
  },
  titleContainer: {
    backgroundColor: '#c3c3c3',
    borderRadius: calcSize(10),
    padding: calcSize(5),
    marginTop: calcSize(10),
  },
  childTitle: {
    fontSize: calcSize(20),
  },
  childName: {
    fontSize: calcSize(20),
    fontWeight: 'bold',
  },
  profileImage: {
    borderRadius: calcSize(50),
    width: calcSize(100),
    height: calcSize(100),
    objectFit: 'cover',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: calcSize(10),
    marginTop: calcSize(10),
  },
  bottomControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addChildBtn: {
    backgroundColor: '#c9066b',
    padding: calcSize(10),
    borderRadius: calcSize(5),
    color: '#fff',
  },
  addChildBtnTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: calcSize(12),
  },
  input: {
    height: calcSize(30),
    width: calcSize(180),
    borderWidth: 1,
    padding: calcSize(5),
    fontSize: calcSize(15),
  },
})
