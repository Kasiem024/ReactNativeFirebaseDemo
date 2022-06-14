'use strict';

// Importing core React Native components
import { } from 'react-native';

// Importing React Native Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing Firebase
// Basically initalizing the app
import fireBaseApp from './firebase';

// Importing screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoginScreen2 from './screens/LoginScreen';

const Stack = createNativeStackNavigator(); // Create a new stack navigator

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen2} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}