// Validacao local dos formularios. Sem dependencia de React para poder
// ser testada como funcao pura.

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const TAMANHO_MINIMO_SENHA = 6;

export function validarEmail(email) {
  const valor = (email || '').trim();
  if (!valor) return 'Informe seu e-mail.';
  if (!REGEX_EMAIL.test(valor)) return 'Digite um e-mail válido, como nome@exemplo.com.';
  return '';
}

export function validarSenha(senha) {
  if (!senha) return 'Informe sua senha.';
  if (senha.length < TAMANHO_MINIMO_SENHA) {
    return `A senha precisa ter ao menos ${TAMANHO_MINIMO_SENHA} caracteres.`;
  }
  return '';
}

export function validarLogin({ email, senha }) {
  const erros = {
    email: validarEmail(email),
    senha: validarSenha(senha),
  };
  return { erros, valido: !erros.email && !erros.senha };
}
