import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

export default function TeskList({data, deleteItem, editItem}) {


  return (
    <View style={styles.conteiner}>
        <TouchableOpacity onPress={() => deleteItem(data.key)}>
          <Feather name="trash" size={25} color="#fff"/>
        </TouchableOpacity>

        <View style={{padding: 10}}>
          <TouchableWithoutFeedback onPress={() => editItem(data)}>
              <Text style={{color: '#fff', paddingRight: 10}}>{data.nome}</Text>
          </TouchableWithoutFeedback>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
      conteiner:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10
      }
})