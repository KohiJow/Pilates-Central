import React from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Tela from '../components/Tela';
import useNavegacaoAutomatica from '../hooks/useNavegacaoAutomatica';
import { cores, espacamento } from '../theme';

export const DURACAO_SPLASH_MS = 2500;

export default function SplashScreen({ navigation }) {
  useNavegacaoAutomatica(navigation, 'Transicao', DURACAO_SPLASH_MS);

  return (
    <Tela centralizada>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityRole="image"
        accessibilityLabel="Logo Pilates Central"
      />
      <ActivityIndicator
        size="large"
        color={cores.primaria}
        style={styles.carregando}
        accessibilityLabel="Carregando"
      />
    </Tela>
  );
}

SplashScreen.propTypes = {
  navigation: PropTypes.shape({ replace: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  carregando: {
    marginTop: espacamento.xxl,
  },
});
