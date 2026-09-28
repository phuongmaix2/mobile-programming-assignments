import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calculator from './Calculator';
import History from './History';

const Stack = createNativeStackNavigator();

export default function App() {
  const [history, setHistory] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Calculator">
          {(props) => (
            <Calculator
              {...props}
              setHistory={setHistory}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="History">
          {() => (
            <History history={history} />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}