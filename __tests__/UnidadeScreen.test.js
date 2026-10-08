import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnidadeScreen from '../screens/UnidadeScreen';
import { UNIDADES } from '../services/unidades';

const navigation = { navigate: jest.fn() };

async function esperarLista() {
  // a lista simula a espera da rede com setTimeout
  await act(async () => {
    jest.runOnlyPendingTimers();
  });
}

describe('UnidadeScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    navigation.navigate.mockClear();
  });

  afterEach(async () => {
    await AsyncStorage.clear();
    jest.useRealTimers();
  });

  it('mostra o carregamento e depois a lista de unidades', async () => {
    render(<UnidadeScreen navigation={navigation} />);
    expect(screen.getByText('Carregando unidades...')).toBeTruthy();

    await esperarLista();

    expect(screen.queryByText('Carregando unidades...')).toBeNull();
    expect(screen.getAllByRole('radio')).toHaveLength(UNIDADES.length);
    expect(screen.getByText(UNIDADES[0].nome)).toBeTruthy();
  });

  it('so libera o confirmar depois de escolher e leva a unidade para o login', async () => {
    render(<UnidadeScreen navigation={navigation} />);
    await esperarLista();

    const confirmar = screen.getByRole('button', { name: 'Confirmar unidade' });
    expect(confirmar).toBeDisabled();

    fireEvent.press(screen.getByText(UNIDADES[1].nome));
    expect(screen.getByText(`Selecionada: ${UNIDADES[1].nome}`)).toBeTruthy();
    expect(confirmar).not.toBeDisabled();

    await act(async () => {
      fireEvent.press(confirmar);
    });

    expect(navigation.navigate).toHaveBeenCalledWith('Login', { unidade: UNIDADES[1] });
    expect(await AsyncStorage.getItem('@pilates-central/unidade')).toBe(UNIDADES[1].id);
  });

  it('pre-seleciona a unidade salva da ultima vez', async () => {
    await AsyncStorage.setItem('@pilates-central/unidade', UNIDADES[2].id);
    render(<UnidadeScreen navigation={navigation} />);
    await esperarLista();

    expect(screen.getByText(`Selecionada: ${UNIDADES[2].nome}`)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Confirmar unidade' })).not.toBeDisabled();
  });
});
