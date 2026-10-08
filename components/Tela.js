import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { cores, espacamento, layout } from '../theme';

// Base de todas as telas: respeita a safe area, aplica o fundo e o padding
// padrao e limita a largura do conteudo em telas grandes.
export default function Tela({ children, centralizada = false, style }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.conteudo, centralizada && styles.centralizada, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

Tela.propTypes = {
  children: PropTypes.node,
  centralizada: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flex: 1,
    width: '100%',
    maxWidth: layout.larguraMaxima,
    alignSelf: 'center',
    paddingHorizontal: espacamento.lg,
    paddingVertical: espacamento.lg,
  },
  centralizada: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
