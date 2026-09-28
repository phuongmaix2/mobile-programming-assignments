import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
import { useState } from 'react';
import {
  Contact,
  ContactField,
  requestPermissionsAsync
} from 'expo-contacts';

type ContactDetails = {
  name: string | null;
  phone: string | undefined;
};

export default function App() {
  const [contacts, setContacts] = useState<ContactDetails[]>([]);

  async function handleGetContacts() {
    const { granted } = await requestPermissionsAsync();

    if (!granted) {
      Alert.alert("Warning", "Permission is required");
      return;
    }

    const allContacts = await Contact.getAll();

    const contactList: ContactDetails[] = [];

    for (const contact of allContacts) {
      const details = await contact.getDetails([
        ContactField.FULL_NAME,
        ContactField.PHONES,
      ]);

      contactList.push({
        name: details.fullName,
        phone: details.phones?.[0]?.number,
      });
    }

    setContacts(contactList);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Contacts</Text>

      <Button
        title="Show Contacts"
        onPress={handleGetContacts}
      />

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contact}>
            <Text style={styles.name}>
              {item.name ?? "No name"}
            </Text>

            <Text style={styles.phone}>
              {item.phone ?? "No phone number"}
            </Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  contact: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  phone: {
    fontSize: 16,
    marginTop: 5,
  },
});