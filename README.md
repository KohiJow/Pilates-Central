# Pilates Central

App mobile de um estudio de pilates, em React Native com Expo. O que existe hoje e o
fluxo de entrada do aluno: abertura, aceite de termos, escolha de unidade e tela de login.

## Stack

| | |
|---|---|
| Runtime | Expo SDK 54 |
| Framework | React Native 0.81.5, React 19.1 |
| Navegacao | React Navigation, native stack |
| Linguagem | JavaScript, sem TypeScript |

Sem backend. Nenhuma tela faz requisicao de rede.

## Fluxo das telas

As cinco telas ficam num unico stack navigator (`App.js`), com header escondido e
transicao em fade. A ordem abaixo e a ordem real de execucao.

**1. Splash** (`screens/SplashScreen.js`)
Mostra `assets/icon.png` e um spinner por 2,5 segundos, depois chama
`navigation.replace('Transicao')`. O timer e limpo no unmount.

**2. Transicao** (`screens/TransicaoScreen.js`)
Anima a palavra "c e n t r a l" com fade de 1,2s e spring de escala, usando
`Animated.parallel` com `useNativeDriver`. Depois de 2,8 segundos vai para Welcome.
Como as duas primeiras telas usam `replace`, nao da para voltar para a abertura.

**3. Welcome** (`screens/WelcomeScreen.js`)
Texto de boas-vindas, resumo dos termos de uso e um checkbox. O botao Continuar fica
cinza enquanto o checkbox nao esta marcado e, se apertado antes disso, mostra um alerta
pedindo o aceite. Com o aceite, navega para Unidade.

**4. Unidade** (`screens/UnidadeScreen.js`)
`FlatList` com tres unidades fixas no proprio arquivo (constante `UNIDADES`), cada uma
com nome e endereco. Selecao em radio button, uma unidade por vez. Confirmar sem
escolher nada mostra alerta. Com uma unidade escolhida, navega para Login.

**5. Login** (`screens/LoginScreen.js`)
Campos de e-mail e senha com validacao local antes de enviar: e-mail vazio ou sem `@`,
senha vazia ou com menos de 6 caracteres. O erro aparece embaixo do campo e a borda
fica vermelha. Tem alternancia para mostrar ou ocultar a senha e
`KeyboardAvoidingView` para o teclado nao cobrir os campos.

## O que ainda nao existe

Sao pontos abertos de proposito, nao bugs:

- **Autenticacao de verdade.** O botao Entrar simula 1,5 segundos de espera com
  `setTimeout` e mostra um alerta de sucesso. Nao ha usuario, senha ou token em nenhum
  lugar do codigo, e nao ha chamada a servidor.
- **Telas pos login.** O stack termina no Login. Nao existe home, agenda nem perfil.
- **Persistencia.** `@react-native-async-storage/async-storage`,
  `@react-navigation/bottom-tabs` e `expo-status-bar` estao no `package.json` mas
  nenhum arquivo do projeto importa. A unidade escolhida e o e-mail digitado ficam
  so no state da tela e somem ao fechar o app.
- **Unidades vindas de API.** A lista de tres unidades e fixa no codigo.

## Rodando

```bash
npm install
npx expo start
```

Abra pelo QR code no Expo Go, ou use `npm run android` / `npm run ios` com emulador.
Tambem roda no navegador com `npm run web`, mas o layout foi pensado em retrato para
celular.

## Estrutura

```
App.js                    stack navigator com as 5 telas
index.js                  registerRootComponent do Expo
app.json                  nome, slug, icone e cor do splash nativo
screens/SplashScreen.js
screens/TransicaoScreen.js
screens/WelcomeScreen.js
screens/UnidadeScreen.js
screens/LoginScreen.js
assets/                   icone, favicon e imagem de splash
```
