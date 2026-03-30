// ✅ useState | ✅ AsyncStorage | ✅ StyleSheet | ✅ Alert
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@pilates_perfil';

export default function PerfilScreen() {
  // ✅ useState
  const [nome,     setNome]     = useState('');
  const [email,    setEmail]    = useState('');
  const [telefone, setTelefone] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  // ✅ AsyncStorage — READ
  const carregarPerfil = async () => {
    try {
      const dados = await AsyncStorage.getItem(KEY);
      if (dados) {
        const perfil = JSON.parse(dados);
        setNome(perfil.nome); setEmail(perfil.email); setTelefone(perfil.telefone);
      }
    } catch (e) {
      Alert.alert('Erro', 'Erro ao carregar perfil.');
    }
  };

  // ✅ AsyncStorage — UPDATE
  const salvarPerfil = async () => {
    if (!nome.trim()) { Alert.alert('Atenção', 'Informe seu nome.'); return; }
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify({ nome, email, telefone }));
      setEditando(false);
      Alert.alert('✏️ UPDATE', 'Perfil salvo com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  // ✅ DELETE (limpar perfil)
  const limparPerfil = () => {
    Alert.alert('🗑️ DELETE', 'Deseja limpar seus dados?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar', style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(KEY);
          setNome(''); setEmail(''); setTelefone('');
          Alert.alert('✅', 'Dados removidos.');
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>👤 Perfil</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome}
          editable={editando} placeholder="Seu nome" />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail}
          editable={editando} placeholder="seu@email.com" keyboardType="email-address" />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone}
          editable={editando} placeholder="(19) 99999-9999" keyboardType="phone-pad" />

        {!editando ? (
          <TouchableOpacity style={[styles.btn, styles.btnEdit]}
            onPress={() => setEditando(true)}>
            <Text style={styles.btnTexto}>✏️ Editar Perfil</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.botoes}>
            <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={salvarPerfil}>
              <Text style={styles.btnTexto}>SALVAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]}
              onPress={() => setEditando(false)}>
              <Text style={styles.btnTexto}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[styles.btn, styles.btnDelete]} onPress={limparPerfil}>
          <Text style={styles.btnTexto}>🗑️ Limpar Dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#F5F0FF', padding: 20, paddingTop: 50 },
  titulo:     { fontSize: 24, fontWeight: 'bold', color: '#6B3FA0', marginBottom: 15 },
  form:       { backgroundColor: '#fff', borderRadius: 10, padding: 15, elevation: 3 },
  label:      { fontSize: 13, color: '#888', marginBottom: 3 },
  input:      { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10,
                marginBottom: 12, fontSize: 15 },
  botoes:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  btn:        { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  btnEdit:    { backgroundColor: '#6B3FA0' },
  btnSave:    { flex: 1, backgroundColor: '#28a745', marginRight: 5 },
  btnCancel:  { flex: 1, backgroundColor: '#888' },
  btnDelete:  { backgroundColor: '#dc3545' },
  btnTexto:   { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});