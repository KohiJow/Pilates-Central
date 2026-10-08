import { alvoToque, cores, tipografia } from '../theme';

// Contraste conforme a WCAG: luminancia relativa e razao (L1 + 0,05) / (L2 + 0,05).
function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const canal = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

function contraste(frente, tras) {
  const [claro, escuro] = [luminancia(frente), luminancia(tras)].sort((a, b) => b - a);
  return (claro + 0.05) / (escuro + 0.05);
}

// Cada par e um texto que de fato aparece sobre aquele fundo nas telas.
const PARES = [
  ['texto', 'fundo'],
  ['texto', 'superficie'],
  ['textoSuave', 'fundo'],
  ['textoSuave', 'superficie'],
  ['primaria', 'fundo'],
  ['primaria', 'superficie'],
  ['erro', 'fundo'],
  ['erro', 'superficie'],
  ['textoClaro', 'primaria'],
  ['textoSuave', 'desativado'],
];

describe('tema', () => {
  it.each(PARES)('%s sobre %s tem contraste de pelo menos 4,5:1', (frente, tras) => {
    expect(contraste(cores[frente], cores[tras])).toBeGreaterThanOrEqual(4.5);
  });

  it('o alvo de toque e de pelo menos 44', () => {
    expect(alvoToque).toBeGreaterThanOrEqual(44);
  });

  it('todo estilo de texto da tipografia tem lineHeight maior que fontSize', () => {
    Object.values(tipografia).forEach((estilo) => {
      expect(estilo.lineHeight).toBeGreaterThan(estilo.fontSize);
    });
  });
});
