import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import Tarefas from './src/pages/Tarefas'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Tarefas />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#212121'
  },
});
