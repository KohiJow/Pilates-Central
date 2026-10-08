import {
  TAMANHO_MINIMO_SENHA,
  validarEmail,
  validarLogin,
  validarSenha,
} from '../utils/validacao';

describe('validarEmail', () => {
  it('exige um valor', () => {
    expect(validarEmail('')).toBe('Informe seu e-mail.');
    expect(validarEmail('   ')).toBe('Informe seu e-mail.');
    expect(validarEmail(undefined)).toBe('Informe seu e-mail.');
  });

  it('rejeita formatos incompletos', () => {
    expect(validarEmail('nome')).not.toBe('');
    expect(validarEmail('nome@')).not.toBe('');
    expect(validarEmail('nome@exemplo')).not.toBe('');
    expect(validarEmail('nome exemplo@teste.com')).not.toBe('');
  });

  it('aceita um e-mail comum, mesmo com espacos nas pontas', () => {
    expect(validarEmail('nome@exemplo.com')).toBe('');
    expect(validarEmail('  nome.sobrenome@exemplo.com.br ')).toBe('');
  });
});

describe('validarSenha', () => {
  it('exige um valor e o tamanho minimo', () => {
    expect(validarSenha('')).toBe('Informe sua senha.');
    expect(validarSenha('a'.repeat(TAMANHO_MINIMO_SENHA - 1))).toContain(
      String(TAMANHO_MINIMO_SENHA),
    );
    expect(validarSenha('a'.repeat(TAMANHO_MINIMO_SENHA))).toBe('');
  });
});

describe('validarLogin', () => {
  it('junta os erros dos dois campos', () => {
    const resultado = validarLogin({ email: '', senha: '' });
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.email).not.toBe('');
    expect(resultado.erros.senha).not.toBe('');
  });

  it('e valido quando os dois campos passam', () => {
    const resultado = validarLogin({ email: 'nome@exemplo.com', senha: '123456' });
    expect(resultado).toEqual({ valido: true, erros: { email: '', senha: '' } });
  });
});
