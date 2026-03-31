import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function TransicaoScreen({ navigation }) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala    = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidade, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(escala, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.texto, { 
        opacity: opacidade, 
        transform: [{ scale: escala }] 
      }]}>
        c e n t r a l
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFAF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 28,
    letterSpacing: 12,
    color: '#5C4A1E', 
    fontWeight: '300',
  },
});