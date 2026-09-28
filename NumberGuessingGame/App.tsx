import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100');
  const [secretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [count, setCount] = useState(0);

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    setCount(count + 1);

    if (guessNum < secretNumber) {
      setMessage('Too low!');
    } else if (guessNum > secretNumber) {
      setMessage('Too high!');
    } else {
      Alert.alert('Correct!', 'You guessed the number in ' + (count + 1) + ' guesses.');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.text}>{message}</Text>

      <TextInput style={styles.input}
        placeholder=""
        onChangeText={text => setGuess(text)}
        keyboardType="numeric"
        value={guess}
      />

      <Button title="Make Guess" onPress={handleGuess} />
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
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '20%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
