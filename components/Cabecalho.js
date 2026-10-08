import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { espacamento, tipografia } from '../theme';

export default function Cabecalho({ titulo, subtitulo, centralizado = false }) {
  const alinhamento = centralizado ? styles.centralizado : null;
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.titulo, alinhamento]} accessibilityRole="header">
        {titulo}
      </Text>
      {subtitulo ? <Text style={[styles.subtitulo, alinhamento]}>{subtitulo}</Text> : null}
    </View>
  );
}

Cabecalho.propTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
  centralizado: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: espacamento.lg,
  },
  titulo: {
    ...tipografia.titulo,
    marginBottom: espacamento.xs,
  },
  subtitulo: {
    ...tipografia.subtitulo,
  },
  centralizado: {
    textAlign: 'center',
  },
});
