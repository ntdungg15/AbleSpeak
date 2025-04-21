import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const Vocabulary = () => {
  const [vocabularyList, setVocabularyList] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const fetchVocabulary = async () => {
    try {
      const response = await fetch('https://api.example.com/vocabulary');
      const data = await response.json();
      setVocabularyList(data); 
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchVocabulary();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemProgress}>Đã thuộc: {item.progress}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" /> 
      ) : (
        <FlatList
          data={vocabularyList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  itemProgress: {
    fontSize: 14,
    color: '#888',
  },
});

export default Vocabulary;