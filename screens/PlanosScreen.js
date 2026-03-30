// ✅ useState | ✅ FlatList | ✅ StyleSheet | ✅ CRUD | ✅ Alert
import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  TextInput, Alert, StyleSheet
} from 'react-native';

const planosMock = [
  { id: '1', nome: 'Mensal',     valor: 'R$ 120,00', status: 'Ativo'    },
  { id: '2', nome: 'Trimestral', valor: 'R$ 300,00', status: 'Ativo'    },
  { id: '3', nome: 'Anual',      valor: 'R$ 999,00', status: 'Inativo'  },
];

export default function PlanosScreen() {
  // ✅ useState
  const [planos,    setPlanos]    = useState(planosMock);
  const [nome,      setNome]      = useState('');
  const [valor,     setValor]     = useState('');
  const [pesquisa,  setPesquisa]  = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const limpar = () => { setNome(''); setValor(''); setEditandoId(null); };

  // ✅ CREATE
  const criar = () => {
    if (!nome.trim()) { Alert.alert('Atenção', 'Informe o nome do plano.'); return; }
    const novo = { id: Date.now().toString(), nome, valor, status: 'Ativo' };
    setPlanos([...planos, novo]);
    Alert.alert('✅ CREATE', `Plano "${nome}" criado!`);
    limpar();
  };

  // ✅ READ (carregar para edição)
  const ler = (plano) => {
    setNome(plano.nome); setValor(plano.valor); setEditandoId(plano.id);
    Alert.alert('📖 READ', `Plano "${plano.nome}" carregado.`);
  };

  // ✅ UPDATE
  const atualizar = () => {
    setPlanos(planos.map(p => p.id === editandoId ? { ...p, nome, valor } : p));
    Alert.alert('✏️ UPDATE', `Plano "${nome}" atualizado!`);
    limpar();
  };

  // ✅ DELETE
  const deletar = (plano) => {
    Alert.alert('🗑️ DELETE', `Excluir "${plano.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive',
        onPress: () => {
          setPlanos(planos.filter(p => p.id !== plano.id));
          Alert.alert('✅', `"${plano.nome}" excluído.`);
        }
      }
    ]);
  };

  // ✅ filtrarLista
  const filtrarLista = (texto) => setPesquisa(texto);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>💳 Planos</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome do plano"
          value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Valor (ex: R$ 120,00)"
          value={valor} onChangeText={setValor} />
        <View style={styles.botoes}>
          <TouchableOpacity style={[styles.btn, styles.btnCreate]} onPress={criar}>
            <Text style={styles.btnTexto}>CREATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnUpdate]} onPress={atualizar}>
            <Text style={styles.btnTexto}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={limpar}>
            <Text style={styles.btnTexto}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ filtrarLista */}
      <TextInput style={styles.busca} placeholder="🔍 Pesquisar plano..."
        value={pesquisa} onChangeText={filtrarLista} />

      {/* ✅ FlatList */}
      <FlatList
        data={planos.filter(p =>
          p.nome.toLowerCase().includes(pesquisa.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardNome}>{item.nome}</Text>
              <Text style={styles.cardInfo}>{item.valor}  —  {item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => ler(item)}>
              <Text style={{ fontSize: 20 }}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletar(item)} style={{ marginLeft: 8 }}>
              <Text style={{ fontSize: 20 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum plano encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#F5F0FF', padding: 20, paddingTop: 50 },
  titulo:     { fontSize: 24, fontWeight: 'bold', color: '#6B3FA0', marginBottom: 15 },
  form:       { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 3 },
  input:      { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 15 },
  busca:      { borderWidth: 1, borderColor: '#6B3FA0', borderRadius: 8, padding: 10,
                marginBottom: 10, fontSize: 15, backgroundColor: '#fff' },
  botoes:     { flexDirection: 'row', justifyContent: 'space-between' },
  btn:        { flex: 1, padding: 10, borderRadius: 8, marginHorizontal: 3, alignItems: 'center' },
  btnCreate:  { backgroundColor: '#28a745' },
  btnUpdate:  { backgroundColor: '#6B3FA0' },
  btnCancel:  { backgroundColor: '#dc3545' },
  btnTexto:   { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  card:       { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8,
                flexDirection: 'row', alignItems: 'center', elevation: 2 },
  cardNome:   { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardInfo:   { fontSize: 13, color: '#888' },
  vazio:      { textAlign: 'center', color: '#aaa', marginTop: 20 },
});