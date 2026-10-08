const ATRASO_SIMULADO_MS = 1500;

// Autenticacao ainda nao existe: o backend nao foi definido. O atraso so
// simula a espera da rede para a tela exercitar o estado de carregamento.
export function fazerLogin({ email, senha }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailLimpo = (email || '').trim();
      if (!emailLimpo || !senha) {
        reject(new Error('E-mail e senha são obrigatórios.'));
        return;
      }
      resolve({ email: emailLimpo });
    }, ATRASO_SIMULADO_MS);
  });
}
