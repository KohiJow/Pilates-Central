import { useEffect } from 'react';

// Troca de tela sozinha depois de um tempo. O timer e limpo no unmount,
// entao sair da tela antes da hora nao dispara navegacao perdida.
export default function useNavegacaoAutomatica(navigation, rota, atrasoMs) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace(rota), atrasoMs);
    return () => clearTimeout(timer);
  }, [navigation, rota, atrasoMs]);
}
