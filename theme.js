import { Platform } from 'react-native';

// Paleta tirada da logo: marrom #8F4A24 sobre bege. Os tons de texto foram
// escolhidos para manter contraste de pelo menos 4,5:1 sobre fundo e superficie;
// o tom claro (destaque) fica so em bordas e detalhes, nunca em texto.
export const cores = {
  fundo: '#FDFAF0',
  superficie: '#F7F2E6',
  borda: '#E8DCC8',
  primaria: '#8F4A24',
  destaque: '#D4A574',
  texto: '#4A3C0F',
  textoSuave: '#6B5733',
  textoClaro: '#FDFAF0',
  erro: '#B8371F',
  desativado: '#E8DCC8',
};

export const espacamento = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const raio = {
  sm: 6,
  md: 12,
  pilula: 30,
};

// 48 fica acima dos 44 minimos recomendados para area de toque
export const alvoToque = 48;

export const layout = {
  // limita a largura do conteudo em tablets sem mudar nada no celular
  larguraMaxima: 440,
};

export const tipografia = {
  titulo: { fontSize: 28, lineHeight: 34, fontWeight: '700', color: cores.texto },
  subtitulo: { fontSize: 16, lineHeight: 22, color: cores.textoSuave },
  corpo: { fontSize: 15, lineHeight: 22, color: cores.texto },
  rotulo: { fontSize: 13, lineHeight: 18, fontWeight: '600', color: cores.texto },
  legenda: { fontSize: 13, lineHeight: 18, color: cores.textoSuave },
  botao: { fontSize: 16, lineHeight: 20, fontWeight: '700' },
};

export const sombra = Platform.select({
  android: { elevation: 4 },
  ios: {
    shadowColor: cores.texto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  default: {},
});
