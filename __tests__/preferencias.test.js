import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  lerEmailSalvo,
  lerUnidadeSalva,
  salvarEmail,
  salvarUnidade,
} from '../services/preferencias';

describe('preferencias', () => {
  afterEach(async () => {
    await AsyncStorage.clear();
    jest.restoreAllMocks();
  });

  it('grava e le a unidade e o e-mail', async () => {
    expect(await lerUnidadeSalva()).toBeNull();

    expect(await salvarUnidade('2')).toBe(true);
    expect(await salvarEmail('nome@exemplo.com')).toBe(true);

    expect(await lerUnidadeSalva()).toBe('2');
    expect(await lerEmailSalvo()).toBe('nome@exemplo.com');
  });

  it('nao lanca quando o armazenamento falha', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('disco cheio'));
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('disco cheio'));

    await expect(lerEmailSalvo()).resolves.toBeNull();
    await expect(salvarEmail('nome@exemplo.com')).resolves.toBe(false);
    expect(console.warn).toHaveBeenCalledTimes(2);
  });
});
