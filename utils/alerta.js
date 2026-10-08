import { Alert, Platform } from 'react-native';

// Alert.alert nao faz nada no navegador; no web cai no alert nativo.
export function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(mensagem ? `${titulo}\n\n${mensagem}` : titulo);
    return;
  }
  Alert.alert(titulo, mensagem);
}
