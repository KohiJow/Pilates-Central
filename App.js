import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen   from './screens/HomeScreen';
import AlunosScreen from './screens/AlunosScreen';
import PlanosScreen from './screens/PlanosScreen';
import PerfilScreen from './screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarActiveTintColor: '#6B3FA0', headerShown: false }}
      >
        <Tab.Screen name="Home"   component={HomeScreen}
          options={{ tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Alunos" component={AlunosScreen}
          options={{ tabBarIcon: () => <Text>👥</Text> }} />
        <Tab.Screen name="Planos" component={PlanosScreen}
          options={{ tabBarIcon: () => <Text>💳</Text> }} />
        <Tab.Screen name="Perfil" component={PerfilScreen}
          options={{ tabBarIcon: () => <Text>👤</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}