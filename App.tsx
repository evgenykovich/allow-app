import { I18nManager } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Toast from 'react-native-toast-message'
import { Home } from './src/containers'
import {
  DepositWithdraw,
  ChildDetails,
  Signup,
  AddChild,
} from './src/components'
import {
  addChildText,
  childDetailsText,
  myChildrenText,
  signUpText,
  withdrawOrDepositText,
} from './src/utils/consts'
import { AppProvider } from './src/contexts/AppContext'

export default function App() {
  const Stack = createStackNavigator()
  I18nManager.allowRTL(false)
  I18nManager.forceRTL(false)
  I18nManager.swapLeftAndRightInRTL(false)

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: signUpText,
              headerTitleAlign: 'center',
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
              headerTitleAlign: 'center',
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
            name="DepositWithdraw"
            component={DepositWithdraw}
            options={{
              title: withdrawOrDepositText,
              headerTitleAlign: 'center',
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
              headerTitleAlign: 'center',
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
              headerTitleAlign: 'center',
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
