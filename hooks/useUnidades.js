import { useCallback, useEffect, useState } from 'react';
import { listarUnidades } from '../services/unidades';

export const MENSAGEM_ERRO_UNIDADES = 'Não foi possível carregar as unidades.';

// Carrega a lista de unidades e expoe carregando, erro e recarregar.
export default function useUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro('');

    listarUnidades()
      .then((lista) => {
        if (ativo) setUnidades(lista);
      })
      .catch(() => {
        if (ativo) setErro(MENSAGEM_ERRO_UNIDADES);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [tentativa]);

  const recarregar = useCallback(() => setTentativa((n) => n + 1), []);

  return { unidades, carregando, erro, recarregar };
}
