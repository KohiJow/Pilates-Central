import React from 'react';
import { Alert } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen, { MENSAGEM_ERRO_LOGIN } from '../screens/LoginScreen';
import { fazerLogin } from '../services/auth';

// mantem o login simulado real e deixa trocar por uma falha
jest.mock('../services/auth', () => {
  const real = jest.requireActual('../services/auth');
  return { ...real, fazerLogin: jest.fn(real.fazerLogin) };
});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(async () => {
    await AsyncStorage.clear();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('mostra os erros de validacao e nao entra', () => {
    render(<LoginScreen />);
    fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByText('Informe seu e-mail.')).toBeTruthy();
    expect(screen.getByText('Informe sua senha.')).toBeTruthy();
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('limpa o erro do campo ao digitar', () => {
    render(<LoginScreen />);
    fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
    fireEvent.changeText(screen.getByLabelText('E-mail'), 'nome@exemplo.com');
    expect(screen.queryByText('Informe seu e-mail.')).toBeNull();
  });

  it('entra com dados validos, mostra carregando e guarda o e-mail', async () => {
    render(<LoginScreen route={{ params: { unidade: { id: '1', nome: 'Unidade Centro' } } }} />);
    expect(screen.getByText('Unidade Centro')).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText('E-mail'), 'nome@exemplo.com');
    fireEvent.changeText(screen.getByLabelText('Senha'), '123456');
    fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByLabelText('Carregando')).toBeTruthy();

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Login realizado', 'Bem-vindo, nome@exemplo.com!');
    expect(screen.queryByLabelText('Carregando')).toBeNull();
    expect(await AsyncStorage.getItem('@pilates-central/email')).toBe('nome@exemplo.com');
  });

  it('mostra o erro geral quando o login falha e libera o botao de novo', async () => {
    fazerLogin.mockRejectedValueOnce(new Error('sem rede'));
    render(<LoginScreen />);

    fireEvent.changeText(screen.getByLabelText('E-mail'), 'nome@exemplo.com');
    fireEvent.changeText(screen.getByLabelText('Senha'), '123456');
    await act(async () => {
      fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));
    });

    expect(screen.getByText(MENSAGEM_ERRO_LOGIN)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Entrar' })).not.toBeDisabled();
    expect(Alert.alert).not.toHaveBeenCalled();
    expect(await AsyncStorage.getItem('@pilates-central/email')).toBeNull();
  });

  it('preenche o ultimo e-mail usado', async () => {
    await AsyncStorage.setItem('@pilates-central/email', 'nome@exemplo.com');
    render(<LoginScreen />);

    await act(async () => {});

    expect(screen.getByLabelText('E-mail')).toHaveDisplayValue('nome@exemplo.com');
  });
});
