import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Octicons'
import { calcSize } from '../../utils/utils'

const keyboardItems = [
  {
    title: '1',
    value: 1,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '2',
    value: 2,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '3',
    value: 3,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '4',
    value: 4,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '5',
    value: 5,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '6',
    value: 6,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '7',
    value: 7,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '8',
    value: 8,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: '9',
    value: 9,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: <Icon name="x-circle" size={calcSize(16)} color="#fff" />,
    value: 'delete',
    style: {
      backgroundColor: '#afafaf',
    },
  },
  {
    title: '0',
    value: 0,
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
  },
  {
    title: <Icon name="arrow-right" size={calcSize(16)} color="#fff" />,
    value: 'submit',
    style: {
      backgroundColor: '#0ba7b8',
    },
  },
]

export const PhoneNumberKeyboard = ({ handleClick }: any) => {
  const renderKeyboardItem = (item: any) => {
    return (
      <TouchableOpacity
        key={item.value}
        style={[styles.keyboardItem, item.style && { ...item.style }]}
        onPress={() => handleClick(item.value)}
      >
        <Text style={styles.keyboardItemTitle}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {keyboardItems.map((item) => renderKeyboardItem(item))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: calcSize(250),
    height: calcSize(180),
    borderRadius: calcSize(20),
    margin: calcSize(10),
  },
  keyboardItem: {
    width: calcSize(60),
    height: calcSize(30),
    borderRadius: calcSize(8),
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: calcSize(10),
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: calcSize(10),
    elevation: calcSize(2),
  },
  keyboardItemTitle: {
    fontSize: calcSize(20),
    fontWeight: 'bold',
  },
})
