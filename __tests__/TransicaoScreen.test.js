import React from 'react';
import { act, render, screen } from '@testing-library/react-native';
import TransicaoScreen, { DURACAO_TRANSICAO_MS } from '../screens/TransicaoScreen';

const navigation = { replace: jest.fn() };

describe('TransicaoScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    navigation.replace.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('mostra a palavra animada e vai para a boas-vindas depois do tempo', () => {
    render(<TransicaoScreen navigation={navigation} />);
    expect(screen.getByLabelText('central')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(DURACAO_TRANSICAO_MS - 1);
    });
    expect(navigation.replace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(navigation.replace).toHaveBeenCalledWith('Welcome');
  });

  it('nao navega se a tela for fechada antes do tempo', () => {
    const { unmount } = render(<TransicaoScreen navigation={navigation} />);
    unmount();

    act(() => {
      jest.advanceTimersByTime(DURACAO_TRANSICAO_MS);
    });
    expect(navigation.replace).not.toHaveBeenCalled();
  });
});
