export const UNIDADES = [
  { id: '1', nome: 'Unidade Centro', endereco: 'Rua das Flores, 123' },
  { id: '2', nome: 'Unidade Cambui', endereco: 'Av. da Paz, 456' },
  { id: '3', nome: 'Unidade Taquaral', endereco: 'R. das Acacias, 789' },
];

const ATRASO_SIMULADO_MS = 400;

// Ainda nao existe backend. A funcao ja devolve uma Promise para que a tela
// trate carregamento e erro do mesmo jeito quando a chamada real entrar.
export function listarUnidades() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(UNIDADES), ATRASO_SIMULADO_MS);
  });
}
