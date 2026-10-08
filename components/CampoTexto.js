import React, { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { alvoToque, cores, espacamento, raio, tipografia } from '../theme';

// Cada tipo ja traz o teclado e o preenchimento automatico certos, assim a
// tela nao precisa repetir essas props a cada campo.
const PROPS_POR_TIPO = {
  texto: {},
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'email',
    textContentType: 'emailAddress',
  },
  senha: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'password',
    textContentType: 'password',
  },
};

const CampoTexto = forwardRef(function CampoTexto(
  {
    rotulo,
    valor,
    onChangeText,
    erro = '',
    tipo = 'texto',
    placeholder,
    editavel = true,
    returnKeyType,
    onSubmitEditing,
  },
  ref,
) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const ehSenha = tipo === 'senha';
  const temErro = Boolean(erro);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View style={[styles.caixa, temErro && styles.caixaErro, !editavel && styles.caixaInativa]}>
        <TextInput
          ref={ref}
          style={styles.input}
          value={valor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={cores.textoSuave}
          editable={editavel}
          secureTextEntry={ehSenha && !senhaVisivel}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          submitBehavior={returnKeyType === 'next' ? 'submit' : 'blurAndSubmit'}
          accessibilityLabel={rotulo}
          accessibilityHint={temErro ? erro : undefined}
          accessibilityState={{ disabled: !editavel }}
          {...PROPS_POR_TIPO[tipo]}
        />
        {ehSenha && (
          <Pressable
            onPress={() => setSenhaVisivel((v) => !v)}
            disabled={!editavel}
            style={({ pressed }) => [styles.alternarSenha, pressed && styles.pressionado]}
            accessibilityRole="button"
            accessibilityLabel={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <Text style={styles.alternarSenhaTexto}>{senhaVisivel ? 'Ocultar' : 'Mostrar'}</Text>
          </Pressable>
        )}
      </View>
      {temErro && (
        <Text style={styles.erro} accessibilityLiveRegion="polite">
          {erro}
        </Text>
      )}
    </View>
  );
});

CampoTexto.propTypes = {
  rotulo: PropTypes.string.isRequired,
  valor: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  erro: PropTypes.string,
  tipo: PropTypes.oneOf(['texto', 'email', 'senha']),
  placeholder: PropTypes.string,
  editavel: PropTypes.bool,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
};

export default CampoTexto;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: espacamento.md,
  },
  rotulo: {
    ...tipografia.rotulo,
    marginBottom: espacamento.xs,
  },
  caixa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderWidth: 1.5,
    borderColor: cores.borda,
    borderRadius: raio.md,
    minHeight: alvoToque + espacamento.xs,
  },
  caixaErro: {
    borderColor: cores.erro,
  },
  caixaInativa: {
    opacity: 0.7,
  },
  input: {
    flex: 1,
    ...tipografia.corpo,
    paddingHorizontal: espacamento.md,
    paddingVertical: espacamento.sm + espacamento.xs,
  },
  alternarSenha: {
    minHeight: alvoToque,
    minWidth: alvoToque,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: espacamento.sm + espacamento.xs,
  },
  alternarSenhaTexto: {
    ...tipografia.rotulo,
    color: cores.primaria,
  },
  pressionado: {
    opacity: 0.6,
  },
  erro: {
    ...tipografia.legenda,
    color: cores.erro,
    marginTop: espacamento.xs,
  },
});
