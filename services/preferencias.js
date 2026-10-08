import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVES = {
  unidade: '@pilates-central/unidade',
  email: '@pilates-central/email',
};

// Leitura e gravacao nunca lancam: perder uma preferencia nao pode derrubar
// a tela. Em desenvolvimento o problema vai para o console.
async function ler(chave) {
  try {
    return await AsyncStorage.getItem(CHAVES[chave]);
  } catch (e) {
    if (__DEV__) console.warn(`nao foi possivel ler a preferencia ${chave}`, e);
    return null;
  }
}

async function salvar(chave, valor) {
  try {
    await AsyncStorage.setItem(CHAVES[chave], valor);
    return true;
  } catch (e) {
    if (__DEV__) console.warn(`nao foi possivel salvar a preferencia ${chave}`, e);
    return false;
  }
}

export const lerUnidadeSalva = () => ler('unidade');
export const salvarUnidade = (id) => salvar('unidade', id);
export const lerEmailSalvo = () => ler('email');
export const salvarEmail = (email) => salvar('email', email);
