
import {
  StyleSheet, Text, View, Button, TextInput,
  FlatList, StatusBar, ActivityIndicator, Image
} from 'react-native';
import { useState } from 'react';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter an ingredient'
        value={ingredient}
        onChangeText={text => setIngredient(text)}
      />

      <Button title="Find" onPress={handleFetch} />

      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) =>
          <View style={styles.card}>
            <Text style={styles.mealName}>
              {item.strMeal}
            </Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    marginBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingBottom: 10,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 130,
  },

  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginHorizontal: 8,
  },
});