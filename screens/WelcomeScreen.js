import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Tela from '../components/Tela';
import Cabecalho from '../components/Cabecalho';
import Checkbox from '../components/Checkbox';
import Botao from '../components/Botao';
import { mostrarAlerta } from '../utils/alerta';
import { cores, espacamento, raio, tipografia } from '../theme';

const AVISO_DOCUMENTO = 'O texto completo ainda não está disponível no app.';

function LinkDocumento({ titulo }) {
  return (
    <Text
      style={styles.link}
      accessibilityRole="link"
      onPress={() => mostrarAlerta(titulo, AVISO_DOCUMENTO)}
    >
      {titulo}
    </Text>
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
          Ao utilizar este aplicativo, você concorda com nossa{' '}
          <LinkDocumento titulo="Política de Privacidade" /> e{' '}
          <LinkDocumento titulo="Termos de Uso" />.
        </Text>
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
        {aceitou ? ' ' : 'Marque a caixa acima para continuar.'}
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
  },
  link: {
    color: cores.primaria,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  dica: {
    ...tipografia.legenda,
    width: '100%',
    marginTop: espacamento.xs,
    marginBottom: espacamento.lg,
  },
});
