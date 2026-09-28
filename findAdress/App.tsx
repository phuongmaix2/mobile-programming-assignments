import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { useState } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');

  const [region, setRegion] = useState<Region>({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const showAddress = async () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Please enter an address');
      return;
    }

    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=6ab24b7cef122295099532bca961ed6`
      );

      if (!response.ok) {
        Alert.alert('Error', `API error: ${response.status}`);
        return;
      }

      const data = await response.json();
      //console.log('Status:', response.status);
      //console.log('Response:', data);

      if (data.length === 0) {
        Alert.alert('Error', 'Address not found');
        return;
      }

      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);

      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setMarker({
        latitude: latitude,
        longitude: longitude,
      });

    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        region={region}
      >
        {marker && (
          <Marker
            coordinate={marker}
            title={address}
          />
        )}
      </MapView>

      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />

        <Button
          title="Show"
          onPress={showAddress}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFill,
  },

  inputContainer: {
    position: 'absolute',
    top: 80,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});