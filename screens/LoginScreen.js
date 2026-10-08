import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [senhaVis, setSenhaVis] = useState(false);
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const timerRef = useRef(null);

  // sem isso, sair da tela durante o loading deixa o setState rodando no vazio
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const validar = () => {
    let valido = true;
    setErroEmail('');
    setErroSenha('');

    if (!email.trim()) {
      setErroEmail('Informe seu e-mail.');
      valido = false;
    } else if (!email.includes('@')) {
      setErroEmail('E-mail inválido.');
      valido = false;
    }

    if (!senha) {
      setErroSenha('Informe sua senha.');
      valido = false;
    } else if (senha.length < 6) {
      setErroSenha('Senha deve ter ao menos 6 caracteres.');
      valido = false;
    }

    return valido;
  };

  // autenticação ainda não existe: o backend não foi definido.
  // o timeout só simula a espera da rede para exercitar o estado de loading.
  const entrar = () => {
    if (loading || !validar()) return;
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
      Alert.alert('Login realizado', `Bem-vindo, ${email.trim()}!`);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.titulo}>Pilates Central</Text>
      <Text style={styles.subtitulo}>Acesse sua conta</Text>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, erroEmail ? styles.inputErro : null]}
          placeholder="seu@email.com"
          placeholderTextColor="#8B7351"
          value={email}
          onChangeText={text => { setEmail(text); setErroEmail(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          editable={!loading}
          accessibilityLabel="E-mail"
        />
        {erroEmail ? <Text style={styles.erroTexto}>{erroEmail}</Text> : null}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Senha</Text>
        <View style={[styles.senhaRow, erroSenha ? styles.inputErro : null]}>
          <TextInput
            style={styles.inputSenha}
            placeholder="••••••••"
            placeholderTextColor="#8B7351"
            value={senha}
            onChangeText={text => { setSenha(text); setErroSenha(''); }}
            secureTextEntry={!senhaVis}
            autoCapitalize="none"
            autoComplete="password"
            editable={!loading}
            accessibilityLabel="Senha"
          />
          <TouchableOpacity
            onPress={() => setSenhaVis(v => !v)}
            accessibilityRole="button"
            accessibilityLabel={senhaVis ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <Text style={styles.olho}>{senhaVis ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
        {erroSenha ? <Text style={styles.erroTexto}>{erroSenha}</Text> : null}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={entrar}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel="Entrar"
        accessibilityState={{ disabled: loading, busy: loading }}
      >
        {loading
          ? <ActivityIndicator color="#FDF7E9" />
          : <Text style={styles.btnTexto}>Entrar</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Alert.alert('Esqueci minha senha', 'Recuperação de senha ainda não disponível.')}
        accessibilityRole="button"
      >
        <Text style={styles.esqueci}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#FDF7E9', padding: 30, justifyContent: 'center' },
  titulo:       { fontSize: 30, fontWeight: 'bold', color: '#4A3C0F', marginBottom: 4, textAlign: 'center' },
  subtitulo:    { fontSize: 15, color: '#4A3C0F', marginBottom: 35, textAlign: 'center',
                  lineHeight: 22, fontWeight: '700' },
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
  esqueci:      { textAlign: 'center', color: '#5C4A1E', marginTop: 25, fontSize: 14, fontWeight: '700' },
});
