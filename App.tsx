import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Toast from 'react-native-toast-message'
import { Home } from './src/components/containers/Home/Home'
import { ChildDetails } from './src/components/ChildDetails'
import { Signup } from './src/components/SignUp/SignUp'
import { AddChild } from './src/components/AddChild/AddChild'
import {
  addChildText,
  childDetailsText,
  myChildrenText,
  signUpText,
} from './src/utils/consts'
import { AppProvider } from './src/contexts/AppContext'

export default function App() {
  const Stack = createStackNavigator()

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: signUpText,
              headerStyle: {
                backgroundColor: '#0ba7b8',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: myChildrenText,
              headerStyle: {
                backgroundColor: '#0ba7b8',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ChildDetails"
            component={ChildDetails}
            options={{
              title: childDetailsText,
              headerStyle: {
                backgroundColor: '#0ba7b8',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AddChild"
            component={AddChild}
            options={{
              title: addChildText,
              headerStyle: {
                backgroundColor: '#0ba7b8',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AppProvider>
  )
}
