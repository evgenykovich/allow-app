import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { calcSize, currencyMapper } from '../../utils/utils'
import { currencyTitle } from '../../utils/consts'
import { deleteChild } from '../../utils/api'
import { useAppContext } from '../../contexts/AppContext'

interface ChildComponentProps {
  child: {
    id: number
    fName: string
    startBalance: string
    balance: string
    currency?: string
    imageId?: string
  }
  navigation: any
}

export const ChildComponent = ({ child, navigation }: ChildComponentProps) => {
  const { fName, balance, currency, imageId, startBalance } = child
  const { sharedData, setSharedData } = useAppContext()
  const updatedBalance = balance ? balance : startBalance

  const handleEditClick = () => {
    navigation.navigate('AddChild', { child })
  }

  const handleDeleteClick = async () => {
    try {
      await deleteChild(String(child.id))
      const newChild = sharedData.filter((item: any) => item.id !== child.id)
      setSharedData(newChild)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <View style={styles.actionsBtnContainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={handleEditClick}
            >
              <IconFeather name="edit" size={calcSize(16)} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={handleDeleteClick}
            >
              <IconMaterialIcons
                name="delete-outline"
                size={calcSize(20)}
                color="#f66"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image style={styles.image} source={{ uri: imageId }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{fName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.currencyTypeContainer}>
            <Text style={styles.currencyIcon}>
              {currencyMapper(currency || '')}
            </Text>
            <Text style={styles.currencyTitle}>{updatedBalance}</Text>
          </View>
          <View>
            <Text style={styles.currencyTitle}>{currencyTitle}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: calcSize(20),
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
  titleContainer: {
    backgroundColor: '#c3c3c3',
    borderRadius: calcSize(10),
    padding: calcSize(5),
    marginTop: calcSize(10),
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: calcSize(8),
    backgroundColor: '#e5e5e5',
    borderRadius: calcSize(10),
    padding: calcSize(5),
    marginTop: calcSize(10),
  },
  currency: {
    fontSize: calcSize(18),
  },
  currencyTitle: {
    fontSize: calcSize(18),
    marginLeft: calcSize(5),
  },
  title: {
    fontSize: calcSize(12),
    fontStyle: 'italic',
    padding: calcSize(1),
  },
  deleteBtn: {
    borderColor: '#f66',
  },
  editBtn: {
    borderColor: '#000',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
  actionsBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#fff',
    borderRadius: calcSize(10),
    margin: calcSize(5),
    borderWidth: calcSize(2),
    borderColor: 'thistle',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: calcSize(30),
    paddingRight: calcSize(16),
    paddingLeft: calcSize(16),
  },
  image: {
    width: calcSize(70),
    height: calcSize(70),
    borderRadius: calcSize(50),
  },
})
