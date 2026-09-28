import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);


  const handleAddition = () => {
    const answer = parseFloat(num1) + parseFloat(num2);

    setResult(answer.toString());
    setHistory((oldHistory) => [
      `${num1} + ${num2} = ${answer}`,
      ...oldHistory,
    ]);
  };

  const handleSubtraction = () => {
    const answer = parseFloat(num1) - parseFloat(num2);

    setResult(answer.toString());
    setHistory((oldHistory) => [
      `${num1} - ${num2} = ${answer}`,
      ...oldHistory,
    ]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
            onPress={handleAddition}
          />

          <Button
            title="-"
            onPress={handleSubtraction}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Calculation History:</Text>
        </View>

        <FlatList
          data={history}
          renderItem={({ item }) => (
            <Text style={styles.historyItem}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <StatusBar style="auto" />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
