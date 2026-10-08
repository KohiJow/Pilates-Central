import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { alvoToque, cores, espacamento, raio, tipografia } from '../theme';

// Cartao selecionavel usado em listas de escolha unica (radio).
export default function OpcaoRadio({ titulo, subtitulo, selecionado, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cartao,
        selecionado && styles.cartaoSelecionado,
        pressed && styles.pressionado,
      ]}
      accessibilityRole="radio"
      accessibilityState={{ selected: selecionado, checked: selecionado }}
      accessibilityLabel={subtitulo ? `${titulo}, ${subtitulo}` : titulo}
    >
      <View style={styles.anel} importantForAccessibility="no">
        {selecionado && <View style={styles.miolo} />}
      </View>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      </View>
    </Pressable>
  );
}

OpcaoRadio.propTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
  selecionado: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: alvoToque,
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    borderWidth: 2,
    borderColor: cores.borda,
    padding: espacamento.md,
    marginBottom: espacamento.sm + espacamento.xs,
  },
  cartaoSelecionado: {
    borderColor: cores.primaria,
    backgroundColor: cores.fundo,
  },
  pressionado: {
    opacity: 0.8,
  },
  anel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: cores.primaria,
    marginRight: espacamento.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miolo: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: cores.primaria,
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    ...tipografia.corpo,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitulo: {
    ...tipografia.legenda,
  },
});
