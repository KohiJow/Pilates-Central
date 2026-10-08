import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Botao from '../components/Botao';

describe('Botao', () => {
  it('chama onPress ao tocar', () => {
    const onPress = jest.fn();
    render(<Botao titulo="Continuar" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Continuar' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('nao chama onPress quando esta desativado e expoe o estado', () => {
    const onPress = jest.fn();
    render(<Botao titulo="Continuar" onPress={onPress} desativado />);
    const botao = screen.getByRole('button', { name: 'Continuar' });
    fireEvent.press(botao);
    expect(onPress).not.toHaveBeenCalled();
    expect(botao).toBeDisabled();
  });

  it('troca o texto pelo indicador enquanto carrega', () => {
    const onPress = jest.fn();
    render(<Botao titulo="Entrar" onPress={onPress} carregando />);
    expect(screen.queryByText('Entrar')).toBeNull();
    expect(screen.getByLabelText('Carregando')).toBeTruthy();
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
