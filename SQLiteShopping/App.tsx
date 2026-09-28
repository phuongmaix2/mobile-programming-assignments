import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

type ShoppingItem = {
  id: number;
  product: string;
  amount: string;
};

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  const db = SQLite.openDatabaseSync('shoppingdb');

  const initialize = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS shopping (
          id INTEGER PRIMARY KEY NOT NULL,
          product TEXT,
          amount TEXT
        );
      `);
    } catch (error) {
      console.error('Could not open database', error);
    }
  };

  const handleFetch = async () => {
    try {
      const list = await db.getAllAsync(
        'SELECT * FROM shopping ORDER BY id DESC'
      );

      setShoppingList(list as ShoppingItem[]);
    } catch (error) {
      console.error('Could not get items', error);
    }
  };

  const handleSave = async () => {
    if (!product || !amount) {
      Alert.alert('Warning', 'Product and amount are required');
      return;
    }

    try {
      await db.runAsync(
        'INSERT INTO shopping (product, amount) VALUES (?, ?)',
        product,
        amount
      );

      setProduct('');
      setAmount('');

      await handleFetch();
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.runAsync(
        'DELETE FROM shopping WHERE id=?',
        id
      );

      await handleFetch();
    } catch (error) {
      console.error('Could not delete item', error);
    }
  };

  const handleClear = async () => {
    try {
      await db.runAsync('DELETE FROM shopping');

      await handleFetch();
    } catch (error) {
      console.error('Could not clear items', error);
    }
  };

  useEffect(() => {
    initialize();
    handleFetch();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="Enter product"
          value={product}
          onChangeText={(text) => setProduct(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <View style={styles.button}>
          <Button title="Add" onPress={handleSave} />
          <Button title="Clear" onPress={handleClear} />
        </View>

        <Text style={styles.titleText}>
          Shopping List
        </Text>

        <FlatList
          style={styles.list}
          data={shoppingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listView}>

              <View>
                <Text style={styles.productText}>
                  {item.product}
                </Text>

                <Text style={styles.amountText}>
                  Amount: {item.amount}
                </Text>
              </View>

              <Text
                style={styles.boughtText}
                onPress={() => handleDelete(item.id)}
              >
                bought
              </Text>

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
    padding: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  titleText: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },

  productText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  amountText: {
    marginTop: 5,
  },

  list: {
    width: '90%',
    marginTop: 10,
  },

  listView: {
    backgroundColor: '#bed7f3',
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  boughtText: {
    color: 'red',
    textDecorationLine: 'underline',
    fontSize: 16,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 10,
  },
});