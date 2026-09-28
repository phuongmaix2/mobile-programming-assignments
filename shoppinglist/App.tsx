import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const handleAdd = () => {
    if (!item) {
      Alert.alert('Warning', "Item is required");
      return;
    }
    setShoppingList([item, ...shoppingList]);
    setItem('');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="enter item"
          value={item}
          onChangeText={(text) => setItem(text)}
        />

        <View style={styles.button}>
          <Button title="Add" onPress={handleAdd} />
          <Button title="Clear" onPress={() => setShoppingList([])} />
        </View>

        <Text style={styles.titleText}>Shopping List</Text>

        <FlatList
          style={{ width: '90%', marginTop: 10 }}
          data={shoppingList}
          renderItem={({ item }) => (
            <View style={styles.listView}>
              <Text style={styles.descriptionText}>{item}</Text>
            </View>
          )}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginBottom: 5,
  },
  listView: {
    backgroundColor: '#bed7f3',
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    marginTop: 10,
  }
});
