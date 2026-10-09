# Pilates Central

App mobile de um estudio de pilates, em React Native com Expo. O que existe hoje e o
fluxo de entrada do aluno: abertura, aceite de termos, escolha de unidade e tela de login.

## Stack

| | |
|---|---|
| Runtime | Expo SDK 54 |
| Framework | React Native 0.81, React 19.1 |
| Navegacao | React Navigation, native stack |
| Persistencia local | AsyncStorage (unidade escolhida e ultimo e-mail) |
| Testes | jest-expo e Testing Library |
| Linguagem | JavaScript com PropTypes, sem TypeScript |

Sem backend. Nenhuma tela faz requisicao de rede; o login e a lista de unidades sao
simulados em `services/` com Promises, para a troca pela API real nao mexer nas telas.

## Rodando

```bash
npm install
npx expo start        # QR code para o Expo Go
npm run android       # emulador Android
npm run ios           # simulador iOS
npm run web           # navegador
npm test              # testes unitarios e de componente
npx expo-doctor       # confere versoes e app.json
```

O layout foi pensado em retrato para celular. No navegador funciona e serve para
conferir as telas, mas os alertas caem no `window.alert`.

## Fluxo das telas

As cinco telas ficam num unico stack navigator (`App.js`), com header escondido,
transicao em fade e fundo igual ao das telas para nao piscar branco. A ordem abaixo
e a ordem real de execucao.

**1. Splash** (`screens/SplashScreen.js`)
Mostra a logo e um spinner por 2,5 segundos, depois chama `navigation.replace('Transicao')`.
O timer fica no hook `useNavegacaoAutomatica` e e limpo no unmount.

**2. Transicao** (`screens/TransicaoScreen.js`)
Anima a palavra "c e n t r a l" com fade de 1,2s e spring de escala. Depois de 2,8
segundos vai para Welcome. Como as duas primeiras telas usam `replace`, nao da para
voltar para a abertura. A animacao e parada no unmount.

**3. Welcome** (`screens/WelcomeScreen.js`)
Texto de boas-vindas, resumo dos termos e um checkbox. O botao Continuar fica
desativado (visual e `accessibilityState`) ate o aceite, com uma dica em texto
explicando o motivo. Os links de Politica de Privacidade e Termos de Uso ficam em
linhas proprias, com area de toque de 48, e abrem um aviso de que o texto completo
ainda nao esta no app. O conteudo fica num `ScrollView`, entao em telas baixas ou com
fonte ampliada o botao continua alcancavel. Com o aceite, navega para Unidade.

**4. Unidade** (`screens/UnidadeScreen.js`)
`FlatList` com as unidades vindas de `services/unidades.js` pelo hook `useUnidades`,
que expoe carregando, erro e recarregar; a lista mostra spinner, mensagem de erro com
"Tentar novamente" ou mensagem de lista vazia conforme o caso. Selecao em radio, uma
por vez, com a escolha repetida em texto embaixo da lista. Confirmar fica desativado
ate escolher. Ao confirmar, a unidade e salva no AsyncStorage e vai como parametro
para o Login. Na proxima vez que a tela abrir, a unidade salva ja vem selecionada.

**5. Login** (`screens/LoginScreen.js`)
Mostra a unidade escolhida, campos de e-mail e senha com validacao local
(`utils/validacao.js`): e-mail vazio ou fora do formato `nome@exemplo.com`, senha vazia
ou com menos de 6 caracteres. O erro aparece embaixo do campo e a borda fica vermelha;
digitar no campo limpa o erro. O campo de e-mail usa teclado de e-mail e o botao
"proximo" do teclado pula para a senha; na senha, "concluido" envia o formulario.
Tem alternancia para mostrar ou ocultar a senha, `KeyboardAvoidingView` com
`ScrollView` para o teclado nao cobrir os campos, e o ultimo e-mail usado volta
preenchido. Enquanto o login simulado roda, o botao vira spinner e os campos travam.
Se a Promise falhar, aparece uma mensagem geral acima do botao.

## Estrutura

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

## Decisoes

- **Um tema so.** Todas as cores, espacamentos e fontes vem de `theme.js`. A paleta
  sai da logo (marrom `#8F4A24` sobre bege); os tons de texto foram escolhidos para
  contraste de pelo menos 4,5:1 sobre fundo e superficie (o teste `tema.test.js`
  calcula a razao de cada par e falha se cair abaixo), e o tom claro `#D4A574` fica
  so em detalhes, nunca em texto.
- **Componentes antes de telas.** Botoes, campos e cartoes tem altura minima de 48,
  `accessibilityRole`, `accessibilityState` e feedback de toque. As telas so compoem.
- **Botao desativado em vez de alerta.** Continuar e Confirmar ficam desativados ate a
  condicao ser atendida, com uma dica em texto (e `accessibilityLiveRegion`) dizendo o
  que falta. E mais previsivel que um alerta ao tocar.
- **Logica fora das telas.** Validacao em funcao pura, chamadas simuladas em `services`
  devolvendo Promise, leitura de preferencias com try/catch. Quando a API entrar, so
  `services/` muda.
- **Cleanup sempre.** Timers e animacoes sao parados no unmount; operacoes assincronas
  checam se a tela ainda esta montada antes de mexer no estado.
- **Status bar sem cor propria.** No SDK 54 o Android roda em edge-to-edge e a cor de
  fundo da status bar nao e mais aplicada; o fundo da tela ja preenche essa faixa, e
  so o estilo (icones escuros) e definido.
- **Assets gerados da logo.** O icone original era um JPEG de 224px com extensao .png,
  e os outros arquivos eram os placeholders do template do Expo. Os quatro foram
  gerados a partir da logo; a origem continua sendo uma imagem de 224px, entao um
  arquivo vetorial ou maior melhoraria a nitidez do icone.

## Testes

```bash
npm test
```

Nove suites em `__tests__/`, com `jest-expo` e `@testing-library/react-native`:

- `validacao.test.js`: regras de e-mail e senha e a combinacao dos dois.
- `tema.test.js`: contraste de cada par texto/fundo do tema, alvo de toque e tipografia.
- `Botao.test.js`: toque, estado desativado e estado de carregamento.
- `SplashScreen.test.js` e `TransicaoScreen.test.js`: troca de tela so depois do tempo
  certo e nenhuma navegacao se a tela for fechada antes (cleanup do timer).
- `WelcomeScreen.test.js`: Continuar travado ate o aceite, dica que some ao marcar,
  links dos documentos e navegacao.
- `UnidadeScreen.test.js`: carregamento, lista, erro com "Tentar novamente", confirmar
  so apos escolher, parametro enviado ao Login e unidade lembrada entre aberturas.
- `LoginScreen.test.js`: erros de validacao, limpeza do erro ao digitar, login simulado
  com spinner e e-mail salvo, mensagem geral quando o login falha e ultimo e-mail
  preenchido.
- `preferencias.test.js`: grava e le as preferencias e nao lanca quando o AsyncStorage
  falha.

O AsyncStorage usa o mock em memoria do proprio pacote (`jest.setup.js`). A versao web
(`npx expo export --platform web`) foi conferida em 360, 390 e 430 de largura, em
360x640 e em paisagem 740x360: sem rolagem horizontal, botoes, checkbox, radios e links
com pelo menos 48 de altura e nenhum aviso no console.

## O que ainda nao existe

Sao pontos abertos de proposito, nao bugs:

- **Autenticacao de verdade.** `services/auth.js` resolve depois de 1,5 segundo e a tela
  mostra um alerta de sucesso. Nao ha usuario, senha ou token em nenhum lugar do codigo.
- **Telas pos login.** O stack termina no Login. Nao existe home, agenda nem perfil.
- **Unidades vindas de API.** `services/unidades.js` devolve tres unidades fixas.
- **Textos dos termos e recuperacao de senha.** Os links e o "Esqueci minha senha"
  so avisam que ainda nao estao disponiveis.
