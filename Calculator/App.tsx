import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Result: {result}</Text>
      <TextInput style={styles.input}
        placeholder="Enter first number"
        onChangeText={num1 => setNum1(num1)}
        keyboardType="numeric"
      />

      <TextInput style={styles.input}
        placeholder="Enter second number"
        value={num2}
        onChangeText={num2 => setNum2(num2)}
        keyboardType="numeric"
      />

      <View style={styles.button}>
        <Button
          title="+"
          onPress={() => setResult((parseFloat(num1) + parseFloat(num2)).toString())}
        />

        <Button
          title="-"
          onPress={() => setResult((parseFloat(num1) - parseFloat(num2)).toString())}
        />
      </View>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  result: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    gap: 20,
  },
});
