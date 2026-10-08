import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const UNIDADES = [
  { id: '1', nome: 'Pilates Central - Unidade Centro', endereco: 'Rua das Flores, 123' },
  { id: '2', nome: 'Pilates Central - Unidade Cambui', endereco: 'Av. da Paz, 456' },
  { id: '3', nome: 'Pilates Central - Unidade Taquaral', endereco: 'R. das Acacias, 789' },
];

export default function UnidadeScreen({ navigation }) {
  const [selecionada, setSelecionada] = useState(null);

  const confirmar = () => {
    if (!selecionada) {
      Alert.alert('Atenção', 'Selecione uma unidade para continuar.');
      return;
    }
    Alert.alert('Confirmado', `"${selecionada.nome}" selecionada.`);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione sua unidade</Text>
      <Text style={styles.subtitulo}>Escolha a unidade mais próxima de você</Text>

      <FlatList
        data={UNIDADES}
        accessibilityRole="radiogroup"
        keyExtractor={item => item.id}
        style={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, selecionada?.id === item.id && styles.cardAtivo]}
            onPress={() => setSelecionada(item)}
            accessibilityRole="radio"
            accessibilityState={{ selected: selecionada?.id === item.id }}
            accessibilityLabel={item.nome + ", " + item.endereco}
          >
            <View style={styles.radioOuter} importantForAccessibility="no">
              {selecionada?.id === item.id && <View style={styles.radioInner} />}
            </View>
            <View style={styles.cardConteudo}>
              <Text style={styles.cardNome}>{item.nome}</Text>
              <Text style={styles.cardEnd}>{item.endereco}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.btnConfirmar}
        onPress={confirmar}
        accessibilityRole="button"
        accessibilityLabel="Confirmar unidade"
      >
        <Text style={styles.btnTexto}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#FDFAF0', padding: 25, paddingTop: 60 },
  titulo:      { fontSize: 24, fontWeight: 'bold', color: '#D4A574', marginBottom: 6 },
  subtitulo:   { fontSize: 15, color: '#8B7351', marginBottom: 30, fontWeight: '500' },
  lista:       { width: '100%', marginBottom: 25 },
  card:        { backgroundColor: '#F7F2E6', borderRadius: 12, padding: 20, marginBottom: 12,
                 flexDirection: 'row', alignItems: 'center', borderWidth: 2,
                 borderColor: '#e8dcc8' },
  cardAtivo:   { borderColor: '#D4A574', backgroundColor: '#FDFAF0' },
  radioOuter:  { width: 24, height: 24, borderRadius: 12, borderWidth: 2,
                 borderColor: '#D4A574', marginRight: 18, justifyContent: 'center', alignItems: 'center' },
  radioInner:  { width: 14, height: 14, borderRadius: 7, backgroundColor: '#D4A574' },
  cardConteudo:{ flex: 1 },
  cardNome:    { fontSize: 16, fontWeight: 'bold', color: '#8B7351', marginBottom: 4 },
  cardEnd:     { fontSize: 14, color: '#5C4A1E' },
  btnConfirmar:{ backgroundColor: '#D4A574', padding: 18, borderRadius: 30,
                 alignItems: 'center', elevation: 4 },
  btnTexto:    { color: '#FDFAF0', fontSize: 16, fontWeight: '700' },
});