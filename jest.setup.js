// AsyncStorage nao existe no ambiente de teste; o pacote fornece um mock em memoria.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
