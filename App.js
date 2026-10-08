import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import SplashScreen from './screens/SplashScreen';
import TransicaoScreen from './screens/TransicaoScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UnidadeScreen from './screens/UnidadeScreen';
import LoginScreen from './screens/LoginScreen';
import { cores } from './theme';

const Stack = createNativeStackNavigator();

// fundo do navegador igual ao das telas, senao aparece um flash branco no fade
const temaNavegacao = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: cores.fundo, primary: cores.primaria },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={temaNavegacao}>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Transicao" component={TransicaoScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Unidade" component={UnidadeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
