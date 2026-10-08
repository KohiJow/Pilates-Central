import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Tela from '../components/Tela';
import Cabecalho from '../components/Cabecalho';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import useMontado from '../hooks/useMontado';
import { fazerLogin } from '../services/auth';
import { lerEmailSalvo, salvarEmail } from '../services/preferencias';
import { validarLogin } from '../utils/validacao';
import { mostrarAlerta } from '../utils/alerta';
import { cores, espacamento, tipografia } from '../theme';

const SEM_ERROS = { email: '', senha: '' };
export const MENSAGEM_ERRO_LOGIN = 'Não foi possível entrar. Tente novamente.';

export default function LoginScreen({ route }) {
  const unidade = route?.params?.unidade;
  const montado = useMontado();
  const campoSenha = useRef(null);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState(SEM_ERROS);
  const [erroGeral, setErroGeral] = useState('');
  const [carregando, setCarregando] = useState(false);

  // preenche o e-mail do ultimo login, sem sobrescrever o que o usuario ja digitou
  useEffect(() => {
    lerEmailSalvo().then((salvo) => {
      if (montado.current && salvo) setEmail((atual) => atual || salvo);
    });
  }, [montado]);

  const entrar = async () => {
    if (carregando) return;
    const { erros: novosErros, valido } = validarLogin({ email, senha });
    setErros(novosErros);
    setErroGeral('');
    if (!valido) return;

    setCarregando(true);
    try {
      const sessao = await fazerLogin({ email, senha });
      await salvarEmail(sessao.email);
      if (!montado.current) return;
      mostrarAlerta('Login realizado', `Bem-vindo, ${sessao.email}!`);
    } catch (e) {
      if (montado.current) setErroGeral(MENSAGEM_ERRO_LOGIN);
    } finally {
      if (montado.current) setCarregando(false);
    }
  };

  return (
    <Tela>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Cabecalho titulo="Pilates Central" subtitulo="Acesse sua conta" centralizado />

          {unidade ? (
            <Text style={styles.unidade} accessibilityLabel={`Unidade escolhida: ${unidade.nome}`}>
              {unidade.nome}
            </Text>
          ) : null}

          <CampoTexto
            rotulo="E-mail"
            tipo="email"
            valor={email}
            onChangeText={(texto) => {
              setEmail(texto);
              setErros((e) => ({ ...e, email: '' }));
            }}
            erro={erros.email}
            placeholder="nome@exemplo.com"
            editavel={!carregando}
            returnKeyType="next"
            onSubmitEditing={() => campoSenha.current?.focus()}
          />

          <CampoTexto
            ref={campoSenha}
            rotulo="Senha"
            tipo="senha"
            valor={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErros((e) => ({ ...e, senha: '' }));
            }}
            erro={erros.senha}
            placeholder="Mínimo de 6 caracteres"
            editavel={!carregando}
            returnKeyType="done"
            onSubmitEditing={entrar}
          />

          {erroGeral ? (
            <Text style={styles.erroGeral} accessibilityLiveRegion="assertive">
              {erroGeral}
            </Text>
          ) : null}

          <Botao
            titulo="Entrar"
            onPress={entrar}
            carregando={carregando}
            accessibilityHint="Valida os campos e entra na sua conta"
            style={styles.entrar}
          />

          <Botao
            variante="texto"
            titulo="Esqueci minha senha"
            onPress={() =>
              mostrarAlerta('Esqueci minha senha', 'Recuperação de senha ainda não disponível.')
            }
            desativado={carregando}
            style={styles.esqueci}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Tela>
  );
}

LoginScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      unidade: PropTypes.shape({
        id: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
      }),
    }),
  }),
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: espacamento.md,
  },
  unidade: {
    ...tipografia.rotulo,
    color: cores.primaria,
    textAlign: 'center',
    marginTop: -espacamento.sm,
    marginBottom: espacamento.lg,
  },
  erroGeral: {
    ...tipografia.legenda,
    color: cores.erro,
    textAlign: 'center',
    marginBottom: espacamento.md,
  },
  entrar: {
    marginTop: espacamento.sm,
  },
  esqueci: {
    marginTop: espacamento.md,
  },
});
