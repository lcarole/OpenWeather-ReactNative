import React, { useState } from 'react';
import { SafeAreaView, StatusBar, TextInput, View, Text, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Home() {
  const [city, setCity] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <View style={styles.container}>
        <Text style={styles.title}>Météo Locale</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez une ville"
          placeholderTextColor="#888"
          value={city}
          onChangeText={setCity}
        />
        <View style={styles.button}>
          <Link style={styles.buttonText} href={`/weather/${city}`}>Voir la météo</Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
  },
});
