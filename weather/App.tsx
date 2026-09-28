import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';

type Weather = {
  date: string;
  min: number;
  max: number;
};

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather[]>([]);

  const getWeather = async () => {
    if (city === '') {
      alert('Please enter a city');
      return;
    }

    // Find city coordinates
    const places = await Location.geocodeAsync(city);

    if (places.length === 0) {
      alert('City not found');
      return;
    }

    const latitude = places[0].latitude;
    const longitude = places[0].longitude;

    // Get weather
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&temperature_unit=celsius&forecast_days=7&timezone=auto`
    );

    const data = await response.json();

    const result: Weather[] = [];

    for (let i = 0; i < 7; i++) {
      result.push({
        date: data.daily.time[i],
        min: data.daily.temperature_2m_min[i],
        max: data.daily.temperature_2m_max[i],
      });
    }

    setWeather(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />

      <Button
        title="Get Weather"
        onPress={getWeather}
      />

      <Text style={styles.city}>{city}</Text>

      <FlatList
        data={weather}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>

            <Text>
              Min: {item.min}°C
            </Text>

            <Text>
              Max: {item.max}°C
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#eaf4ff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  city: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  date: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});