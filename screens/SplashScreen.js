import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Transicao');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityRole="image"
        accessibilityLabel="Logo Pilates Central"
      />
      <ActivityIndicator size="large" color="#4A3C0F" style={styles.loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFAF0", // mesmo fundo da logo, evita flash de cor
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  loading: {
    marginTop: 45,
  },
});