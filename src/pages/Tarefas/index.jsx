import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Login from '../Login';
import firebase from '../../service/firebaseconnection';
import TeskList from '../TeskList';
import Feather from 'react-native-vector-icons/Feather';

export default function Tarefas() {
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [key, setKey] = useState('');

  /*
-----------------------------

FUNÇÃO COLETANDO OS ELEMENTOS REGISTRADOS NO FIREBASE

-----------------------------
*/

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }

      firebase
        .database()
        .ref('tarefas')
        .child(user)
        .once('value', snapshot => {
          setTasks([]);

          snapshot?.forEach(childItem => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };

            setTasks(oldTasks => [...oldTasks, data]);
          });
        });
    }

    getUser();
  }, [user]);

  /*
  -----------------------------

    FUNÇÃO PARA DELETAR

  -----------------------------
*/
  function handlerDelete(key) {
    firebase
      .database()
      .ref('tarefas')
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTescks = tasks.filter(item => item.key !== key);
        setTasks(findTescks);
        alert('Item Deletado com Sucesso');
      });
  }

  /*
  -----------------------------

  FUNÇÃO PARA EDITAR

  -----------------------------
*/

  function handlerEdit(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  /*
  -----------------------------

  FUNÇÃO PARA ADICIONAR

  -----------------------------
*/

  function handlerAdd() {
    if (newTask === '') {
      return;
    }

    // USUARIO QUER EDITAR A TAREFA

    if (key !== '') {
      firebase
        .database()
        .ref('tarefas')
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === key);
          const taskClone = tasks;

          taskClone[taskIndex].nome = newTask;

          setTasks([...taskClone]);
        });

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newTask,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask,
        };

        setTasks(oldtasks => [...oldtasks, data]);
      });

    Keyboard.dismiss();
    setNewTask('');
  }

  function cancelEdit() {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  // VERIFICANDO SE EXISTE UM USUARIO LOGADO
  if (!user) {
    return <Login changeStatus={user => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ContainerTask}>
        <TextInput
          style={styles.input}
          placeholder="O qué você vai fazer Hoje"
          placeholderTextColor={'#fff4'}
          value={newTask}
          onChangeText={text => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handlerAdd}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      </View>

      {key.length > 0 && (
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name="x-circle" size={20} color="#ff0000" />
          </TouchableOpacity>
          <Text style={{marginLeft: 5, color: '#ff0000'}}>
            Você está editando uma tarefa!
          </Text>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TeskList
            data={item}
            deleteItem={handlerDelete}
            editItem={handlerEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ContainerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: '#fff',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#454545',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#2465ff',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
