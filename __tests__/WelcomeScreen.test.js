import React from 'react';
import { Alert } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import WelcomeScreen from '../screens/WelcomeScreen';

const navigation = { navigate: jest.fn() };

describe('WelcomeScreen', () => {
  beforeEach(() => {
    navigation.navigate.mockClear();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('so libera o continuar depois de aceitar os termos', () => {
    render(<WelcomeScreen navigation={navigation} />);
    const continuar = screen.getByRole('button', { name: 'Continuar' });

    expect(continuar).toBeDisabled();
    expect(screen.getByText('Marque a caixa acima para continuar.')).toBeTruthy();

    fireEvent.press(continuar);
    expect(navigation.navigate).not.toHaveBeenCalled();

    fireEvent.press(screen.getByRole('checkbox'));
    expect(continuar).not.toBeDisabled();
    expect(screen.queryByText('Marque a caixa acima para continuar.')).toBeNull();

    fireEvent.press(continuar);
    expect(navigation.navigate).toHaveBeenCalledWith('Unidade');
  });

  it('os links dos documentos avisam que o texto ainda nao existe', () => {
    render(<WelcomeScreen navigation={navigation} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    fireEvent.press(screen.getByRole('link', { name: 'Termos de Uso' }));
    expect(Alert.alert).toHaveBeenCalledWith('Termos de Uso', expect.any(String));
  });

  it('desmarcar o checkbox trava o botao de novo', () => {
    render(<WelcomeScreen navigation={navigation} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.press(checkbox);
    fireEvent.press(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
  });
});
