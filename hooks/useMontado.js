import { useEffect, useRef } from 'react';

// Diz se o componente ainda esta na tela. Serve para nao chamar setState
// depois que uma operacao assincrona termina com a tela ja fechada.
export default function useMontado() {
  const montado = useRef(true);
  useEffect(() => {
    montado.current = true;
    return () => {
      montado.current = false;
    };
  }, []);
  return montado;
}
