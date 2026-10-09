import React from 'react';
import { act, render, screen } from '@testing-library/react-native';
import SplashScreen, { DURACAO_SPLASH_MS } from '../screens/SplashScreen';

const navigation = { replace: jest.fn() };

describe('SplashScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    navigation.replace.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('mostra a logo e troca para a transicao so depois do tempo', () => {
    render(<SplashScreen navigation={navigation} />);
    expect(screen.getByLabelText('Logo Pilates Central')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(DURACAO_SPLASH_MS - 1);
    });
    expect(navigation.replace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(navigation.replace).toHaveBeenCalledWith('Transicao');
  });

  it('nao navega se a tela for fechada antes do tempo', () => {
    const { unmount } = render(<SplashScreen navigation={navigation} />);
    unmount();

    act(() => {
      jest.advanceTimersByTime(DURACAO_SPLASH_MS);
    });
    expect(navigation.replace).not.toHaveBeenCalled();
  });
});
