import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Tela from '../components/Tela';
import Cabecalho from '../components/Cabecalho';
import Checkbox from '../components/Checkbox';
import Botao from '../components/Botao';
import { mostrarAlerta } from '../utils/alerta';
import { alvoToque, cores, espacamento, raio, tipografia } from '../theme';

const AVISO_DOCUMENTO = 'O texto completo ainda não está disponível no app.';

// Link em linha propria, e nao dentro do paragrafo, para ter area de toque de 48.
function LinkDocumento({ titulo }) {
  return (
    <Pressable
      onPress={() => mostrarAlerta(titulo, AVISO_DOCUMENTO)}
      style={({ pressed }) => [styles.linkLinha, pressed && styles.linkPressionado]}
      accessibilityRole="link"
    >
      <Text style={styles.link}>{titulo}</Text>
    </Pressable>
  );
}

LinkDocumento.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default function WelcomeScreen({ navigation }) {
  const [aceitou, setAceitou] = useState(false);

  return (
    <Tela centralizada>
      <Cabecalho
        titulo="Pilates Central"
        subtitulo="Bem-vindo ao seu espaço de bem-estar"
        centralizado
      />

      <View style={styles.termos}>
        <Text style={styles.termosTexto}>
          Ao utilizar este aplicativo, você concorda com nossa Política de Privacidade e
          Termos de Uso.
        </Text>
        <LinkDocumento titulo="Política de Privacidade" />
        <LinkDocumento titulo="Termos de Uso" />
        <Text style={styles.termosRodape}>
          Seus dados são utilizados exclusivamente para gerenciamento das suas aulas e planos.
        </Text>
      </View>

      <Checkbox
        marcado={aceitou}
        onToggle={() => setAceitou((v) => !v)}
        rotulo="Li e aceito os termos de uso"
      />

      <Text style={styles.dica} accessibilityLiveRegion="polite">
        {aceitou ? '' : 'Marque a caixa acima para continuar.'}
      </Text>

      <Botao
        titulo="Continuar"
        onPress={() => navigation.navigate('Unidade')}
        desativado={!aceitou}
        accessibilityHint="Vai para a escolha da unidade"
      />
    </Tela>
  );
}

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  termos: {
    width: '100%',
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    borderLeftWidth: 5,
    borderLeftColor: cores.destaque,
    padding: espacamento.lg,
    marginBottom: espacamento.lg,
  },
  termosTexto: {
    ...tipografia.corpo,
    marginBottom: espacamento.sm,
  },
  termosRodape: {
    ...tipografia.legenda,
    fontStyle: 'italic',
    marginTop: espacamento.sm,
  },
  linkLinha: {
    minHeight: alvoToque,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  linkPressionado: {
    opacity: 0.6,
  },
  link: {
    ...tipografia.corpo,
    color: cores.primaria,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  dica: {
    ...tipografia.legenda,
    // altura fixa para o botao nao pular quando a dica some
    minHeight: tipografia.legenda.lineHeight,
    width: '100%',
    marginTop: espacamento.xs,
    marginBottom: espacamento.lg,
  },
});
