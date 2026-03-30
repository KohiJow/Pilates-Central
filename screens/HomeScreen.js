// ✅ useState | ✅ StyleSheet.create | ✅ FlatList
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const aulasMock = [
  { id: '1', horario: '07:00', professor: 'Ana Lima',    vagas: 5 },
  { id: '2', horario: '09:00', professor: 'Carlos Melo', vagas: 2 },
  { id: '3', horario: '18:00', professor: 'Ana Lima',    vagas: 8 },
];

export default function HomeScreen() {
  // ✅ useState obrigatório
  const [planoAtivo]   = useState('Mensal - R$ 120,00');
  const [frequencia]   = useState('12 aulas este mês');
  const [aulas]        = useState(aulasMock);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.titulo}>🧘 Pilates Central</Text>

      {/* Dashboard */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Plano Ativo</Text>
        <Text style={styles.cardValor}>{planoAtivo}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Frequência</Text>
        <Text style={styles.cardValor}>{frequencia}</Text>
      </View>

      {/* ✅ FlatList obrigatório */}
      <Text style={styles.subtitulo}>Próximas Aulas</Text>
      <FlatList
        data={aulas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>⏰ {item.horario} — {item.professor}</Text>
            <Text style={styles.itemVagas}>Vagas: {item.vagas}</Text>
          </View>
        )}
      />
    </View>
  );
}

// ✅ StyleSheet.create obrigatório
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F5F0FF', padding: 20, paddingTop: 50 },
  titulo:       { fontSize: 24, fontWeight: 'bold', color: '#6B3FA0', marginBottom: 20 },
  subtitulo:    { fontSize: 18, fontWeight: 'bold', color: '#6B3FA0', marginVertical: 10 },
  card:         { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10,
                  shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitulo:   { fontSize: 14, color: '#888' },
  cardValor:    { fontSize: 18, fontWeight: 'bold', color: '#333' },
  item:         { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8,
                  flexDirection: 'row', justifyContent: 'space-between' },
  itemTexto:    { fontSize: 14, color: '#333' },
  itemVagas:    { fontSize: 13, color: '#6B3FA0', fontWeight: 'bold' },
});