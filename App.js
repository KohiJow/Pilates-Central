import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen    from './screens/SplashScreen';
import TransicaoScreen from './screens/TransicaoScreen';
import WelcomeScreen   from './screens/WelcomeScreen';
import UnidadeScreen   from './screens/UnidadeScreen';
import LoginScreen     from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Splash"    component={SplashScreen} />
        <Stack.Screen name="Transicao" component={TransicaoScreen} />
        <Stack.Screen name="Welcome"   component={WelcomeScreen} />
        <Stack.Screen name="Unidade"   component={UnidadeScreen} />
        <Stack.Screen name="Login"     component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}