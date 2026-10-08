import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Tela from '../components/Tela';
import useNavegacaoAutomatica from '../hooks/useNavegacaoAutomatica';
import { cores } from '../theme';

export const DURACAO_TRANSICAO_MS = 2800;

export default function TransicaoScreen({ navigation }) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.8)).current;

  useNavegacaoAutomatica(navigation, 'Welcome', DURACAO_TRANSICAO_MS);

  useEffect(() => {
    const animacao = Animated.parallel([
      Animated.timing(opacidade, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(escala, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]);
    animacao.start();
    return () => animacao.stop();
  }, [opacidade, escala]);

  return (
    <Tela centralizada>
      <Animated.Text
        style={[styles.texto, { opacity: opacidade, transform: [{ scale: escala }] }]}
        accessibilityLabel="central"
      >
        c e n t r a l
      </Animated.Text>
    </Tela>
  );
}

TransicaoScreen.propTypes = {
  navigation: PropTypes.shape({ replace: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 28,
    letterSpacing: 12,
    color: cores.primaria,
    fontWeight: '300',
  },
});
