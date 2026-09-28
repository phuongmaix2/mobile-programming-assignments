import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native';

export default function Calculator({ navigation, setHistory }: any) {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');

    const handleAddition = () => {
        const answer = parseFloat(num1) + parseFloat(num2);

        setResult(answer.toString());

        setHistory((oldHistory: string[]) => [
            `${num1} + ${num2} = ${answer}`,
            ...oldHistory,
        ]);
    };

    const handleSubtraction = () => {
        const answer = parseFloat(num1) - parseFloat(num2);

        setResult(answer.toString());

        setHistory((oldHistory: string[]) => [
            `${num1} - ${num2} = ${answer}`,
            ...oldHistory,
        ]);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.result}>
                Result: {result}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter first number"
                onChangeText={setNum1}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Enter second number"
                onChangeText={setNum2}
                keyboardType="numeric"
            />

            <View style={styles.button}>
                <Button title="+" onPress={handleAddition} />
                <Button title="-" onPress={handleSubtraction} />
                <Button
                    title="History"
                    onPress={() => navigation.navigate('History')}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    result: {
        fontSize: 24,
        marginBottom: 20,
        marginTop: 50,
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