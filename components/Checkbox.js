import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { alvoToque, cores, espacamento, raio, tipografia } from '../theme';

export default function Checkbox({ marcado, onToggle, rotulo }) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.linha, pressed && styles.pressionado]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: marcado }}
      accessibilityLabel={rotulo}
    >
      <View style={[styles.caixa, marcado && styles.caixaMarcada]} importantForAccessibility="no">
        {marcado && <Text style={styles.marca}>✓</Text>}
      </View>
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

Checkbox.propTypes = {
  marcado: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  rotulo: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: alvoToque,
    width: '100%',
  },
  pressionado: {
    opacity: 0.7,
  },
  caixa: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: cores.primaria,
    borderRadius: raio.sm,
    marginRight: espacamento.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.superficie,
  },
  caixaMarcada: {
    backgroundColor: cores.primaria,
  },
  marca: {
    color: cores.textoClaro,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
  },
  rotulo: {
    ...tipografia.corpo,
    flex: 1,
  },
});
