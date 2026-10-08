import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [aceitou, setAceitou] = useState(false);

  const continuar = () => {
    if (!aceitou) {
      Alert.alert('Atenção', 'Você precisa aceitar os termos para continuar.');
      return;
    }
    navigation.navigate('Unidade');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Pilates Central</Text>
        <Text style={styles.subtitulo}>Bem-vindo ao seu espaço de bem-estar</Text>

        <View style={styles.termosBox}>
          <Text style={styles.termosTexto}>
            Ao utilizar este aplicativo, você concorda com nossa{' '}
            <Text style={styles.link}>Política de Privacidade</Text> e{' '}
            <Text style={styles.link}>Termos de Uso</Text>.
          </Text>
          <Text style={styles.termosRodape}>
            Seus dados são utilizados exclusivamente para gerenciamento das suas aulas e planos.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAceitou(v => !v)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: aceitou }}
          accessibilityLabel="Li e aceito os termos de uso"
        >
          <View style={[styles.checkbox, aceitou && styles.checkboxAtivo]}>
            {aceitou && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>Li e aceito os termos de uso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnContinuar, !aceitou && styles.btnDesativado]}
          onPress={continuar}
          accessibilityRole="button"
          accessibilityLabel="Continuar"
          accessibilityHint="Aceite os termos para avançar"
        >
          <Text style={styles.btnTexto}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFAF0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    width: '100%',
    maxWidth: 380, // limite para tablets e telas grandes
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4A574',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#8B7351',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  termosBox: {
    backgroundColor: '#F7F2E6',
    borderRadius: 12,
    padding: 22,
    marginBottom: 35,
    borderLeftWidth: 5,
    borderLeftColor: '#D4A574',
    width: '100%',
  },
  termosTexto: {
    fontSize: 14,
    color: '#8B7351',
    lineHeight: 22,
    marginBottom: 8,
  },
  termosRodape: {
    fontSize: 13,
    color: '#5C4A1E',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  link: {
    color: '#D4A574',
    fontWeight: '700',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
    width: '100%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D4A574',
    borderRadius: 6,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxAtivo: {
    backgroundColor: '#D4A574',
  },
  checkmark: {
    color: '#FDFAF0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkLabel: {
    fontSize: 15,
    color: '#8B7351',
    lineHeight: 22,
    flex: 1,
  },
  btnContinuar: {
    backgroundColor: '#D4A574',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 4,
    width: '100%',
    alignItems: 'center',
  },
  btnDesativado: {
    backgroundColor: '#e8dcc8',
  },
  btnTexto: {
    color: '#FDFAF0',
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '400',
  },
});