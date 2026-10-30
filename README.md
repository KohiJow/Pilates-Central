# Pilates Central
English | [Português](README.pt-BR.md)

> **Note:** this repository is the early prototype, built in Expo, and no longer receives changes.
> The studio's app is now the web app at https://github.com/pilates-central/pilates-central.github.io,
> published at https://pilates-central.github.io/.
> What follows is kept as a record of what was done here.

Mobile app for a Pilates studio, in React Native with Expo. What exists today is the student's
entry flow: opening screens, accepting the terms, choosing a studio location (unidade) and the
login screen.

## Stack

| | |
|---|---|
| Runtime | Expo SDK 54 |
| Framework | React Native 0.81, React 19.1 |
| Navigation | React Navigation, native stack |
| Local persistence | AsyncStorage (chosen location and last email) |
| Tests | jest-expo and Testing Library |
| Language | JavaScript with PropTypes, no TypeScript |

No backend. No screen makes network requests; the login and the list of locations are
simulated in `services/` with Promises, so that swapping in the real API does not touch the
screens.

## Running

```bash
npm install
npx expo start        # QR code para o Expo Go
npm run android       # emulador Android
npm run ios           # simulador iOS
npm run web           # navegador
npm test              # testes unitarios e de componente
npx expo-doctor       # confere versoes e app.json
```

The layout was designed for phones in portrait mode. It works in the browser and is useful for
checking the screens, but alerts fall back to `window.alert`.

## Screen flow

The five screens live in a single stack navigator (`App.js`), with the header hidden, a fade
transition and a background matching the screens so there is no white flash. The order below
is the actual order in which they run.

**1. Splash** (`screens/SplashScreen.js`)
Shows the logo and a spinner for 2.5 seconds, then calls `navigation.replace('Transicao')`.
The timer lives in the `useNavegacaoAutomatica` hook and is cleared on unmount.

**2. Transicao** (`screens/TransicaoScreen.js`)
Animates the word "c e n t r a l" with a 1.2s fade and a scale spring. After 2.8 seconds it
goes to Welcome. Since the first two screens use `replace`, there is no way back to the opening
screens. The animation is stopped on unmount.

**3. Welcome** (`screens/WelcomeScreen.js`)
Welcome text, a summary of the terms and a checkbox. The Continue button stays disabled
(visually and in `accessibilityState`) until the terms are accepted, with a text hint
explaining why. The Privacy Policy and Terms of Use links sit on their own lines, with a touch
area of 48, and open a notice saying the full text is not in the app yet. The content sits in
a `ScrollView`, so on short screens or with enlarged fonts the button is still reachable. Once
the terms are accepted, it navigates to Unidade.

**4. Unidade** (`screens/UnidadeScreen.js`)
A `FlatList` with the locations coming from `services/unidades.js` through the `useUnidades`
hook, which exposes carregando, erro and recarregar (loading, error and reload); the list shows
a spinner, an error message with "Tentar novamente" (Try again) or an empty-list message,
depending on the case. Radio selection, one at a time, with the choice repeated as text below
the list. Confirm stays disabled until a choice is made. On confirm, the location is saved in
AsyncStorage and passed as a parameter to Login. The next time the screen opens, the saved
location is already selected.

**5. Login** (`screens/LoginScreen.js`)
Shows the chosen location and has email and password fields with local validation
(`utils/validacao.js`): email empty or not in the `nome@exemplo.com` format, password empty or
shorter than 6 characters. The error appears below the field and the border turns red; typing
in the field clears the error. The email field uses the email keyboard, and the keyboard's
"next" button jumps to the password; in the password field, "done" submits the form. There is
a toggle to show or hide the password, a `KeyboardAvoidingView` with a `ScrollView` so the
keyboard does not cover the fields, and the last email used comes back prefilled. While the
simulated login runs, the button turns into a spinner and the fields are locked. If the Promise
fails, a general message appears above the button.

## Structure

```
App.js                        stack navigator, SafeAreaProvider, status bar e tema da navegacao
index.js                      registerRootComponent do Expo
app.json                      nome, icone, icone adaptativo, splash e favicon
theme.js                      cores, espacamento, tipografia, raio, sombra e alvo de toque
screens/                      as cinco telas, so composicao e estado local
components/
  Tela.js                     SafeAreaView + fundo + padding + largura maxima
  Botao.js                    primario ou texto, com carregando e desativado
  CampoTexto.js               rotulo, erro, teclado por tipo (texto, email, senha)
  Checkbox.js
  OpcaoRadio.js               cartao selecionavel da lista de unidades
  Cabecalho.js                titulo e subtitulo
  MensagemEstado.js           carregando, vazio ou erro, com acao opcional
hooks/
  useNavegacaoAutomatica.js   replace depois de um tempo, com cleanup
  useUnidades.js              carrega a lista e expoe carregando, erro e recarregar
  useMontado.js               evita setState depois do unmount
services/
  unidades.js                 lista fixa devolvida por Promise
  auth.js                     login simulado por Promise
  preferencias.js             AsyncStorage que nunca lanca
utils/
  validacao.js                funcoes puras de validacao do login
  alerta.js                   Alert.alert no celular, window.alert no navegador
__tests__/                    jest-expo
assets/                       icone, icone adaptativo, splash e favicon gerados da logo
```

## Decisions

- **A single theme.** All colors, spacing and fonts come from `theme.js`. The palette comes
  from the logo (brown `#8F4A24` on beige); the text shades were chosen for a contrast of at
  least 4.5:1 against the background and the surface (the `tema.test.js` test calculates the
  ratio for each pair and fails if it falls below that), and the light shade `#D4A574` is used
  only for details, never for text.
- **Components before screens.** Buttons, fields and cards have a minimum height of 48,
  `accessibilityRole`, `accessibilityState` and touch feedback. The screens only compose them.
- **Disabled button instead of an alert.** Continue and Confirm stay disabled until the
  condition is met, with a text hint (and `accessibilityLiveRegion`) saying what is missing.
  This is more predictable than an alert on tap.
- **Logic outside the screens.** Validation in a pure function, simulated calls in `services`
  returning a Promise, reading preferences with try/catch. When the API comes in, only
  `services/` changes.
- **Always clean up.** Timers and animations are stopped on unmount; async operations check
  whether the screen is still mounted before touching the state.
- **Status bar without its own color.** On SDK 54, Android runs edge-to-edge and the status bar
  background color is no longer applied; the screen background already fills that strip, and
  only the style (dark icons) is set.
- **Assets generated from the logo.** The original icon was a 224px JPEG with a .png
  extension, and the other files were the Expo template placeholders. All four were generated
  from the logo; the source is still a 224px image, so a vector file or a larger one would make
  the icon sharper.

## Tests

```bash
npm test
```

Nine suites in `__tests__/`, with `jest-expo` and `@testing-library/react-native`:

- `validacao.test.js`: email and password rules and the combination of the two.
- `tema.test.js`: contrast of each text/background pair in the theme, touch target and
  typography.
- `Botao.test.js`: tap, disabled state and loading state.
- `SplashScreen.test.js` and `TransicaoScreen.test.js`: the screen changes only after the right
  time, and there is no navigation if the screen is closed before that (timer cleanup).
- `WelcomeScreen.test.js`: Continue locked until the terms are accepted, the hint that
  disappears when the box is checked, the document links and navigation.
- `UnidadeScreen.test.js`: loading, list, error with "Tentar novamente", confirming only after
  choosing, the parameter sent to Login and the location remembered between launches.
- `LoginScreen.test.js`: validation errors, the error clearing on typing, the simulated login
  with a spinner and the email being saved, the general message when the login fails, and the
  last email prefilled.
- `preferencias.test.js`: saves and reads the preferences, and does not throw when
  AsyncStorage fails.

AsyncStorage uses the package's own in-memory mock (`jest.setup.js`). The web version
(`npx expo export --platform web`) was checked at widths of 360, 390 and 430, at 360x640 and in
landscape at 740x360: no horizontal scrolling; buttons, checkbox, radios and links at least 48
tall; and no warnings in the console.

## What does not exist yet

These points are open on purpose, not bugs:

- **Real authentication.** `services/auth.js` resolves after 1.5 seconds and the screen shows a
  success alert. There is no user, password or token anywhere in the code.
- **Post-login screens.** The stack ends at Login. There is no home, schedule or profile.
- **Locations from an API.** `services/unidades.js` returns three hard-coded locations.
- **Terms text and password recovery.** The links and "Esqueci minha senha" (Forgot my
  password) only say that they are not available yet.
