import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, ActivityIndicator, Animated } from 'react-native';

import api from './src/services/api';
import Filmes from './src/components/Filmes';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const animatedWidth = useRef(new Animated.Value(200)).current

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get('r-api/?api=filmes');
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFilmes();
  }, []);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: 500,
      duration: 2500,
      useNativeDriver: false
    }).start()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#121212" size={45} />

          <Animated.View
            style={{
              width: animatedWidth,
              height: 60,
              backgroundColor: "#d910e0",
              justifyContent: 'center',
              alignItems: 'center',

            }}
          >

            <Text style={styles.loadingText}>Carregando Filmes...⌛</Text>
          </Animated.View>
        </View>
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Filmes data={item} />}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
