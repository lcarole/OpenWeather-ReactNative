import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, Text, Image, StyleSheet } from 'react-native';

interface WeatherData {
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  name: string;
}

export default function WeatherDetail() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = '904a0da56cba1f7f3b26d1a404019288';

  useEffect(() => {
    if (!city) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => setData(json))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!data || !data.main) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Ville « {city} » non trouvée.</Text>
      </View>
    );
  }

  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.city}>{data.name}</Text>
        <View style={styles.card}>
          <Image
            style={styles.icon}
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
          />
          <Text style={styles.temp}>{temp.toFixed(1)}°C</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Humidité</Text>
            <Text style={styles.infoValue}>{humidity}%</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Vent</Text>
            <Text style={styles.infoValue}>{speed} m/s</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  desc: {
    fontSize: 20,
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  error: {
    fontSize: 18,
    color: '#fff',
  },
});
