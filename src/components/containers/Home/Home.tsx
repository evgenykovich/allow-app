import { useEffect } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ChildComponent } from '../../ChildComponent'
import { calcSize } from '../../../utils/utils'
import { addChildText } from '../../../utils/consts'
import { useAppContext } from '../../../contexts/AppContext'
import { getChildren } from '../../../utils/api'

export const Home = ({ navigation }: any) => {
  const { sharedData, setSharedData, personalData } = useAppContext()

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const { children } = await getChildren(personalData.parentId)
        setSharedData(children)
      } catch (e) {
        console.log('error', e)
      }
    }
    fetchChildren()
  }, [])

  const handleAddUser = () => {
    navigation.navigate('AddChild')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sharedData}
        renderItem={({ item }) => (
          <ChildComponent navigation={navigation} child={item} />
        )}
      />
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.addChildBtn} onPress={handleAddUser}>
          <Text style={styles.addChildBtnTitle}>{addChildText}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: calcSize(10),
    paddingLeft: calcSize(10),
    paddingRight: calcSize(10),
    paddingBottom: calcSize(10),
  },
  bottomControls: {
    position: 'absolute',
    bottom: calcSize(15),
    left: calcSize(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: calcSize(10),
  },
  addChildBtn: {
    backgroundColor: '#0ba7b8',
    padding: calcSize(10),
    borderRadius: calcSize(5),
    color: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: calcSize(10),
    elevation: calcSize(2),
  },
  addChildBtnTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: calcSize(12),
  },
})
