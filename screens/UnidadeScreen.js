import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Tela from '../components/Tela';
import Cabecalho from '../components/Cabecalho';
import OpcaoRadio from '../components/OpcaoRadio';
import Botao from '../components/Botao';
import MensagemEstado from '../components/MensagemEstado';
import useUnidades from '../hooks/useUnidades';
import { lerUnidadeSalva, salvarUnidade } from '../services/preferencias';
import { espacamento, tipografia } from '../theme';

export default function UnidadeScreen({ navigation }) {
  const { unidades, carregando, erro, recarregar } = useUnidades();
  const [selecionadaId, setSelecionadaId] = useState(null);

  // pre-seleciona a ultima unidade escolhida, se ela ainda existir na lista
  useEffect(() => {
    let ativo = true;
    if (unidades.length === 0) return undefined;
    lerUnidadeSalva().then((idSalvo) => {
      if (ativo && idSalvo && unidades.some((u) => u.id === idSalvo)) {
        setSelecionadaId((atual) => atual ?? idSalvo);
      }
    });
    return () => {
      ativo = false;
    };
  }, [unidades]);

  const selecionada = unidades.find((u) => u.id === selecionadaId) || null;

  const confirmar = () => {
    if (!selecionada) return;
    salvarUnidade(selecionada.id);
    navigation.navigate('Login', { unidade: selecionada });
  };

  const renderEstado = () => {
    if (carregando) return <MensagemEstado carregando texto="Carregando unidades..." />;
    if (erro) {
      return (
        <MensagemEstado
          erro
          texto={erro}
          acao={{ titulo: 'Tentar novamente', onPress: recarregar }}
        />
      );
    }
    return <MensagemEstado texto="Nenhuma unidade disponível no momento." />;
  };

  return (
    <Tela>
      <Cabecalho titulo="Selecione sua unidade" subtitulo="Escolha a unidade mais próxima de você" />

      <FlatList
        data={unidades}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        contentContainerStyle={styles.listaConteudo}
        accessibilityRole="radiogroup"
        ListEmptyComponent={renderEstado}
        renderItem={({ item }) => (
          <OpcaoRadio
            titulo={item.nome}
            subtitulo={item.endereco}
            selecionado={item.id === selecionadaId}
            onPress={() => setSelecionadaId(item.id)}
          />
        )}
      />

      <Text style={styles.dica} accessibilityLiveRegion="polite">
        {selecionada ? `Selecionada: ${selecionada.nome}` : 'Toque em uma unidade para selecionar.'}
      </Text>

      <Botao
        titulo="Confirmar"
        onPress={confirmar}
        desativado={!selecionada}
        accessibilityLabel="Confirmar unidade"
        accessibilityHint="Vai para a tela de login"
      />
    </Tela>
  );
}

UnidadeScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  listaConteudo: {
    paddingBottom: espacamento.sm,
  },
  dica: {
    ...tipografia.legenda,
    marginBottom: espacamento.sm + espacamento.xs,
  },
});
