import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { HistoryDetails } from '../../utils/types'
import { calcSize, currencyMapper } from '../../utils/utils'
import { ActionType } from '../ChildDetails'

interface HistoryTableComponentProps {
  id: string
  type: string
  date: string
  amount: string
  currency: string
  description: string
}

export const HistoryTableComponent = ({
  id,
  type,
  date,
  amount,
  currency,
  description,
}: HistoryTableComponentProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState<HistoryDetails[]>([])
  const [loading, setLoading] = useState(false)

  const renderDetails = () => {
    return details.map((detail: HistoryDetails) => {
      const { id, type, date, amount, currency, description } = detail
      return (
        <HistoryTableComponent
          key={id}
          id={id}
          type={type}
          date={date}
          amount={amount}
          description={description}
          currency={currency}
        />
      )
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setShowDetails(!showDetails)
          // getDetails()
        }}
      >
        <View style={styles.item}>
          <Text
            style={[
              styles.itemText,
              type === ActionType.deposit && styles.depositColor,
              type === ActionType.withdraw && styles.withdrawColor,
              type === ActionType.allowens && styles.allowensColor,
            ]}
          >
            {currencyMapper(currency || '')} {amount}
          </Text>
        </View>
        <View
          style={[
            styles.item,
            { marginRight: calcSize(5), marginLeft: calcSize(5) },
          ]}
        >
          <Text
            style={[
              styles.itemText,
              type === ActionType.deposit && styles.depositColor,
              type === ActionType.withdraw && styles.withdrawColor,
              type === ActionType.allowens && styles.allowensColor,
            ]}
          >
            {description}
          </Text>
        </View>
        <View style={styles.item}>
          <Text
            style={[
              styles.itemText,
              type === ActionType.deposit && styles.depositColor,
              type === ActionType.withdraw && styles.withdrawColor,
              type === ActionType.allowens && styles.allowensColor,
            ]}
          >
            {new Date(date).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerItem}>
              <Text style={styles.headerText}>סכום</Text>
            </View>
            <View style={styles.headerItem}>
              <Text style={styles.headerText}>תיאור</Text>
            </View>
            <View style={styles.headerItem}>
              <Text style={styles.headerText}>תאריך</Text>
            </View>
          </View>
          <ScrollView style={styles.historyContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              renderDetails()
            )}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: calcSize(10),
    marginBottom: calcSize(10),
    overflow: 'hidden',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: calcSize(8),
    paddingLeft: calcSize(8),
  },
  depositColor: {
    color: '#09ab29',
  },
  withdrawColor: {
    color: '#d10909',
  },
  allowensColor: {
    color: '#0950d1',
  },
  item: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderRadius: 1,
    borderColor: 'gray',
    borderWidth: 2,
    padding: calcSize(10),
  },
  itemText: {
    fontSize: calcSize(10),
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: calcSize(10),
    marginBottom: calcSize(10),
    overflow: 'hidden',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: calcSize(10),
  },
  headerItem: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: calcSize(16),
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: calcSize(10),
    marginBottom: calcSize(10),
    overflow: 'hidden',
  },
})
