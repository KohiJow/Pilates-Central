import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { cores, espacamento, tipografia } from '../theme';
import Botao from './Botao';

// Estado de carregamento, vazio ou erro de uma lista, com acao opcional.
export default function MensagemEstado({ carregando = false, texto, erro = false, acao }) {
  return (
    <View style={styles.wrapper} accessibilityLiveRegion="polite">
      {carregando ? (
        <ActivityIndicator size="large" color={cores.primaria} accessibilityLabel="Carregando" />
      ) : null}
      {texto ? <Text style={[styles.texto, erro && styles.textoErro]}>{texto}</Text> : null}
      {acao ? <Botao variante="texto" titulo={acao.titulo} onPress={acao.onPress} /> : null}
    </View>
  );
}

MensagemEstado.propTypes = {
  carregando: PropTypes.bool,
  texto: PropTypes.string,
  erro: PropTypes.bool,
  acao: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: espacamento.xl,
  },
  texto: {
    ...tipografia.subtitulo,
    textAlign: 'center',
    marginTop: espacamento.md,
  },
  textoErro: {
    color: cores.erro,
  },
});
