import { StyleSheet, Text, FlatList } from 'react-native';

export default function History({ history }: any) {
    return (
        <FlatList
            style={styles.list}
            data={history}
            renderItem={({ item }) => (
                <Text style={styles.item}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
    },

    item: {
        fontSize: 18,
        marginBottom: 10,
    },
});