import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  
} from 'react-native';
import React, {useState} from 'react';

import firebase from '../../service/firebaseconnection';

export default function Login({ changeStatus }) {
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlerLogin() {
    if(type == 'login'){
      // aqui fazemos o login

      const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid)
      }).catch((err) => {
        console.log (err)
        alert('Não existe uma conta criada com esse email')
        return
      })
      
      
    } else {
      // Aqui cadastramos o ususario
      
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid)
      }).catch((err) => {
        console.log (err)
        alert('Ouve um Erro')
      return
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: '#fff',
          fontSize: 45,
          textAlign: 'center',
          marginBottom: 45,
          fontWeight: 'bold',
        }}>
        Aplicativo de Tarefas
      </Text>

      {/* Aréa de email */}
      <TextInput
        placeholder="Digite seu email"
        style={styles.input}
        value={email}
        placeholderTextColor={'#fff4'}
        onChangeText={email => setEmail(email)}
      />

      {/* Aréa de senha */}
      <TextInput
        placeholder="Digite sua Senha"
        style={styles.input}
        value={password}
        placeholderTextColor={'#fff4'}
        onChangeText={password => setPassword(password)}
      />

      <TouchableOpacity
        style={[
          styles.handleLogin,
          {backgroundColor: type === 'login' ? '#2465ff' : '#fff'},
        ]}
        onPress={handlerLogin}>
        <Text style={[styles.loginText, {color: type == 'login' ? "#fff" : '#2465ff'}]}>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType(type => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text style={{textAlign: 'center', color:  '#fff8'}}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#1c1c1c',
    borderRadius: 20,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#454545',
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 50,
    marginBottom: 10,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
