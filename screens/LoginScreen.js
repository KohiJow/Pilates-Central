import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [senhaVis, setSenhaVis] = useState(false);
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const validar = () => {
    let valido = true;
    setErroEmail(''); setErroSenha('');

    if (!email.trim()) { setErroEmail('Informe seu e-mail.'); valido = false; }
    else if (!email.includes('@')) { setErroEmail('E-mail inválido.'); valido = false; }
    if (!senha.trim()) { setErroSenha('Informe sua senha.'); valido = false; }
    else if (senha.length < 6) { setErroSenha('Senha deve ter ao menos 6 caracteres.'); valido = false; }
    return valido;
  };

  const entrar = () => {
    if (!validar()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Login realizado', `Bem-vindo, ${email}!`);
      // navigation.navigate('Main'); ← descomentado quando tiver as tabs
    }, 1500);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.titulo}>Pilates Central</Text>
      <Text style={styles.subtitulo}><Text style={styles.bold}>Acesse sua conta</Text></Text>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, erroEmail ? styles.inputErro : null]}
          placeholder="seu@email.com"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={text => { setEmail(text); setErroEmail(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {erroEmail ? <Text style={styles.erroTexto}>{erroEmail}</Text> : null}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Senha</Text>
        <View style={[styles.senhaRow, erroSenha ? styles.inputErro : null]}>
          <TextInput
            style={styles.inputSenha}
            placeholder="••••••••"
            placeholderTextColor="#bbb"
            value={senha}
            onChangeText={text => { setSenha(text); setErroSenha(''); }}
            secureTextEntry={!senhaVis}
          />
          <TouchableOpacity onPress={() => setSenhaVis(!senhaVis)}>
            <Text style={styles.olho}>{senhaVis ? 'Mostrar' : 'Ocultar'}</Text>
          </TouchableOpacity>
        </View>
        {erroSenha ? <Text style={styles.erroTexto}>{erroSenha}</Text> : null}
      </View>

      <TouchableOpacity style={styles.btn} onPress={entrar} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#FDF7E9" />
          : <Text style={styles.btnTexto}>Entrar</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.esqueci}><Text style={styles.bold}>Esqueci minha senha</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#FDF7E9', padding: 30, justifyContent: 'center' },
  titulo:       { fontSize: 30, fontWeight: 'bold', color: '#4A3C0F', marginBottom: 4, textAlign: 'center' },
  subtitulo:    { fontSize: 15, color: '#4A3C0F', marginBottom: 35, textAlign: 'center', lineHeight: 22 },
  inputWrapper: { marginBottom: 20 },
  label:        { fontSize: 13, color: '#4A3C0F', marginBottom: 6, fontWeight: '600' },
  input:        { backgroundColor: '#F7F2E6', borderWidth: 1.5, borderColor: '#e8dcc8',
                  borderRadius: 12, padding: 16, fontSize: 15, color: '#4A3C0F' },
  inputErro:    { borderColor: '#e74c3c' },
  erroTexto:    { color: '#e74c3c', fontSize: 12, marginTop: 4 },
  senhaRow:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F2E6',
                  borderWidth: 1.5, borderColor: '#e8dcc8', borderRadius: 12, paddingHorizontal: 16 },
  inputSenha:   { flex: 1, padding: 16, fontSize: 15, color: '#4A3C0F' },
  olho:         { fontSize: 13, color: '#4A3C0F', fontWeight: '500', padding: 5 },
  btn:          { backgroundColor: '#4A3C0F', padding: 18, borderRadius: 30,
                  alignItems: 'center', marginTop: 15, elevation: 4 },
  btnTexto:     { color: '#FDF7E9', fontSize: 16, fontWeight: 'bold' },
  esqueci:      { textAlign: 'center', color: '#5C4A1E', marginTop: 25, fontSize: 14 },
  bold:         { fontWeight: '700' },
});