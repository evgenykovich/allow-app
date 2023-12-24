import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { HistoryTableComponent } from './HistoryTableComponent'
import { History } from '../../utils/types'
import { getHistory } from '../../utils/api'
import { calcSize } from '../../utils/utils'
import { ScrollView } from 'react-native-gesture-handler'

export const HistoryTableContainer = ({ childId }: any) => {
  const [history, setHistory] = useState<History[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const { transactions } = await getHistory(childId)
        setHistory(transactions)
      } catch (e) {
        console.log('error', e)
      }
      setLoading(false)
    }
    fetchHistory()
  }, [])

  const renderHistory = () => {
    if (!history) {
      return
    }

    return history.map((historyItem: History) => {
      const { id, type, date, amount, currency, description } = historyItem
      return (
        <HistoryTableComponent
          key={id}
          id={id}
          type={type}
          date={date}
          description={description}
          amount={amount}
          currency={currency}
        />
      )
    })
  }

  return (
    <View style={styles.container}>
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
          renderHistory()
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: calcSize(8),
    height: 'auto',
  },
  headerItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderRadius: 1,
    borderColor: 'gray',
    borderWidth: 2,
    width: calcSize(82),
  },
  headerText: {
    fontSize: calcSize(12),
    fontStyle: 'italic',
    color: '#000',
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
})
