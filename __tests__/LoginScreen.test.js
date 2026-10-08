import React from 'react';
import { Alert } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';

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
});
