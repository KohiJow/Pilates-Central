// ✅ useState | ✅ FlatList | ✅ StyleSheet | ✅ CRUD | ✅ Alert | ✅ filtrarLista | ✅ AsyncStorage
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, Alert, StyleSheet, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pilates_alunos';

export default function AlunosScreen() {
  // ✅ useState em todos os campos
  const [alunos,    setAlunos]    = useState([]);
  const [pesquisa,  setPesquisa]  = useState('');
  const [nome,      setNome]      = useState('');
  const [telefone,  setTelefone]  = useState('');
  const [plano,     setPlano]     = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [loading,   setLoading]   = useState(true); // ✅ loading state

  // Carrega do AsyncStorage ao abrir a tela
  useEffect(() => {
    carregarAlunos();
  }, []);

  // ✅ AsyncStorage — carregar
  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) setAlunos(JSON.parse(dados));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os alunos.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ AsyncStorage — salvar
  const salvarAlunos = async (lista) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const limparFormulario = () => {
    setNome(''); setTelefone(''); setPlano(''); setEditandoId(null);
  };

  // ✅ CREATE
  const criarAluno = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do aluno.');
      return;
    }
    const novoAluno = {
      id: Date.now().toString(),
      nome, telefone, plano,
    };
    const novaLista = [...alunos, novoAluno];
    setAlunos(novaLista);
    salvarAlunos(novaLista);
    limparFormulario();
    Alert.alert('✅ CREATE', `Aluno "${nome}" cadastrado com sucesso!`);
  };

  // ✅ READ — carregar aluno para edição
  const lerAluno = (aluno) => {
    setNome(aluno.nome);
    setTelefone(aluno.telefone);
    setPlano(aluno.plano);
    setEditandoId(aluno.id);
    Alert.alert('📖 READ', `Aluno "${aluno.nome}" carregado para edição.`);
  };

  // ✅ UPDATE
  const atualizarAluno = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do aluno.');
      return;
    }
    const novaLista = alunos.map(a =>
      a.id === editandoId ? { ...a, nome, telefone, plano } : a
    );
    setAlunos(novaLista);
    salvarAlunos(novaLista);
    Alert.alert('✏️ UPDATE', `Aluno "${nome}" atualizado com sucesso!`);
    limparFormulario();
  };

  // ✅ DELETE
  const deletarAluno = (aluno) => {
    Alert.alert(
      '🗑️ DELETE',
      `Deseja excluir "${aluno.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', style: 'destructive',
          onPress: () => {
            const novaLista = alunos.filter(a => a.id !== aluno.id);
            setAlunos(novaLista);
            salvarAlunos(novaLista);
            Alert.alert('✅', `"${aluno.nome}" excluído.`);
          }
        }
      ]
    );
  };

  // ✅ filtrarLista — mesmo padrão do projeto do professor
  const filtrarLista = (texto) => {
    setPesquisa(texto);
  };

  // ✅ loading state
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6B3FA0" />
        <Text>Carregando alunos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👥 Alunos</Text>

      {/* Formulário CRUD */}
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome"
          value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Telefone"
          value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Plano (Mensal / Trimestral)"
          value={plano} onChangeText={setPlano} />

        {/* Botões CRUD */}
        <View style={styles.botoes}>
          <TouchableOpacity style={[styles.btn, styles.btnCreate]} onPress={criarAluno}>
            <Text style={styles.btnTexto}>CREATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnUpdate]} onPress={atualizarAluno}>
            <Text style={styles.btnTexto}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={limparFormulario}>
            <Text style={styles.btnTexto}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ filtrarLista — busca por nome */}
      <TextInput
        style={styles.busca}
        placeholder="🔍 Pesquisar por nome..."
        value={pesquisa}
        onChangeText={filtrarLista}
      />

      {/* ✅ FlatList com filtro */}
      <FlatList
        data={alunos.filter(a =>
          a.nome.toLowerCase().includes(pesquisa.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.alunoCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.alunoNome}>{item.nome}</Text>
              <Text style={styles.alunoInfo}>📱 {item.telefone}  |  💳 {item.plano}</Text>
            </View>
            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => lerAluno(item)}>
                <Text style={styles.btnRead}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarAluno(item)}>
                <Text style={styles.btnDelete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum aluno cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#F5F0FF', padding: 20, paddingTop: 50 },
  loading:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo:     { fontSize: 24, fontWeight: 'bold', color: '#6B3FA0', marginBottom: 15 },
  form:       { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10,
                elevation: 3 },
  input:      { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10,
                marginBottom: 8, fontSize: 15 },
  busca:      { borderWidth: 1, borderColor: '#6B3FA0', borderRadius: 8, padding: 10,
                marginBottom: 10, fontSize: 15, backgroundColor: '#fff' },
  botoes:     { flexDirection: 'row', justifyContent: 'space-between' },
  btn:        { flex: 1, padding: 10, borderRadius: 8, marginHorizontal: 3, alignItems: 'center' },
  btnCreate:  { backgroundColor: '#28a745' },
  btnUpdate:  { backgroundColor: '#6B3FA0' },
  btnCancel:  { backgroundColor: '#dc3545' },
  btnTexto:   { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  alunoCard:  { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8,
                flexDirection: 'row', alignItems: 'center', elevation: 2 },
  alunoNome:  { fontSize: 16, fontWeight: 'bold', color: '#333' },
  alunoInfo:  { fontSize: 13, color: '#888', marginTop: 2 },
  acoes:      { flexDirection: 'row', gap: 10 },
  btnRead:    { fontSize: 22 },
  btnDelete:  { fontSize: 22 },
  vazio:      { textAlign: 'center', color: '#aaa', marginTop: 20 },
});