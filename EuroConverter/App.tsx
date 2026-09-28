import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetch('https://api.apilayer.com/exchangerates_data/latest?base=EUR', {
      headers: {
        'apikey': process.env.EXPO_PUBLIC_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => setRates(data.rates))
  }, []);

  const convert = () => {
    const rate = rates[currency];
    const euros = Number(amount) / rate;
    setResult(euros);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Euro Converter</Text>
      <TextInput
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <View>
        <Picker
          selectedValue={currency}
          onValueChange={(itemValue) => setCurrency(itemValue)}
        >
          {Object.keys(rates).map((code) => (
            <Picker.Item
              key={code}
              label={code}
              value={code}
            />
          ))}
        </Picker>
      </View>
      <Button title="Convert" onPress={convert} />
      <Text style={styles.result}>Result: {result.toFixed(2)} EUR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    bottom: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
