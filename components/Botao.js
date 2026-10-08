import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { alvoToque, cores, espacamento, raio, sombra, tipografia } from '../theme';

export default function Botao({
  titulo,
  onPress,
  variante = 'primario',
  carregando = false,
  desativado = false,
  accessibilityLabel,
  accessibilityHint,
  style,
}) {
  const primario = variante === 'primario';
  const inativo = desativado || carregando;

  return (
    <Pressable
      onPress={onPress}
      disabled={inativo}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || titulo}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inativo, busy: carregando }}
      style={({ pressed }) => [
        styles.base,
        primario ? styles.primario : styles.texto,
        primario && desativado && styles.primarioDesativado,
        !primario && inativo && styles.textoDesativado,
        pressed && !inativo && styles.pressionado,
        style,
      ]}
    >
      {carregando ? (
        <ActivityIndicator
          color={primario ? cores.textoClaro : cores.primaria}
          accessibilityLabel="Carregando"
        />
      ) : (
        <Text
          style={[
            styles.rotulo,
            primario ? styles.rotuloPrimario : styles.rotuloTexto,
            primario && desativado && styles.rotuloDesativado,
          ]}
        >
          {titulo}
        </Text>
      )}
    </Pressable>
  );
}

Botao.propTypes = {
  titulo: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  variante: PropTypes.oneOf(['primario', 'texto']),
  carregando: PropTypes.bool,
  desativado: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  accessibilityHint: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  base: {
    minHeight: alvoToque,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: espacamento.lg,
    paddingVertical: espacamento.sm,
  },
  primario: {
    width: '100%',
    backgroundColor: cores.primaria,
    borderRadius: raio.pilula,
    ...sombra,
  },
  primarioDesativado: {
    // sem sombra para o botao desativado nao parecer flutuando
    backgroundColor: cores.desativado,
    elevation: 0,
    shadowOpacity: 0,
  },
  texto: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  textoDesativado: {
    opacity: 0.5,
  },
  pressionado: {
    opacity: 0.75,
  },
  rotulo: {
    ...tipografia.botao,
    textAlign: 'center',
  },
  rotuloPrimario: {
    color: cores.textoClaro,
  },
  rotuloTexto: {
    color: cores.primaria,
  },
  rotuloDesativado: {
    color: cores.textoSuave,
  },
});
