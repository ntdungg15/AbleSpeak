import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Types
type IllustrationType = 'dictionary' | 'vocabulary';
type IllustrationCategory = 'animals' | 'food' | 'travel' | 'nature' | 'sports';

interface IllustrationItem {
  id: string;
  word: string;
  definition: string;
  pronunciation: string;
  audioUrl: string;
  imageUrl: any; // Using require for local images
  category: IllustrationCategory;
  type: IllustrationType;
  options?: string[]; // For vocabulary builder
  correctAnswer?: number; // For vocabulary builder
}

const InteractiveIllustrations: React.FC = () => {
  const [activeType, setActiveType] = useState<IllustrationType>('dictionary');
  const [activeCategory, setActiveCategory] = useState<IllustrationCategory>('animals');
  const [selectedItem, setSelectedItem] = useState<IllustrationItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Sample data
  const illustrations: IllustrationItem[] = [
    // Picture Dictionary items
    {
      id: 'animal1',
      word: 'Lion',
      definition: 'A large wild cat with a mane around its face, living in Africa.',
      pronunciation: '/ˈlaɪən/',
      audioUrl: 'https://example.com/audio/lion.mp3',
      imageUrl: require('../../../../assets/images/lion.png'),
      category: 'animals',
      type: 'dictionary',
    },
    {
      id: 'animal2',
      word: 'Elephant',
      definition: 'A very large animal with a long, flexible nose and two tusks.',
      pronunciation: '/ˈelɪfənt/',
      audioUrl: 'https://example.com/audio/elephant.mp3',
      imageUrl: require('../../../../assets/images/elephant.png'),
      category: 'animals',
      type: 'dictionary',
    },
    {
      id: 'food1',
      word: 'Pizza',
      definition: 'A flat, round bread covered with tomato sauce, cheese, and other toppings.',
      pronunciation: '/ˈpiːtsə/',
      audioUrl: 'https://example.com/audio/pizza.mp3',
      imageUrl: require('../../../../assets/images/pizza.png'),
      category: 'food',
      type: 'dictionary',
    },
    {
      id: 'food2',
      word: 'Sushi',
      definition: 'A Japanese dish of prepared rice with fish, vegetables, or eggs.',
      pronunciation: '/ˈsuːʃi/',
      audioUrl: 'https://example.com/audio/sushi.mp3',
      imageUrl: require('../../../../assets/images/sushi.png'),
      category: 'food',
      type: 'dictionary',
    },
    
    // Vocabulary Builder items
    {
      id: 'voc-animal1',
      word: 'Lion',
      definition: 'A large wild cat with a mane around its face, living in Africa.',
      pronunciation: '/ˈlaɪən/',
      audioUrl: 'https://example.com/audio/lion.mp3',
      imageUrl: require('../../../../assets/images/lion.png'),
      category: 'animals',
      type: 'vocabulary',
      options: ['Tiger', 'Lion', 'Leopard', 'Cheetah'],
      correctAnswer: 1,
    },
    {
      id: 'voc-animal2',
      word: 'Elephant',
      definition: 'A very large animal with a long, flexible nose and two tusks.',
      pronunciation: '/ˈelɪfənt/',
      audioUrl: 'https://example.com/audio/elephant.mp3',
      imageUrl: require('../../../../assets/images/elephant.png'),
      category: 'animals',
      type: 'vocabulary',
      options: ['Rhinoceros', 'Hippopotamus', 'Elephant', 'Giraffe'],
      correctAnswer: 2,
    },
    {
      id: 'voc-food1',
      word: 'Pizza',
      definition: 'A flat, round bread covered with tomato sauce, cheese, and other toppings.',
      pronunciation: '/ˈpiːtsə/',
      audioUrl: 'https://example.com/audio/pizza.mp3',
      imageUrl: require('../../../../assets/images/pizza.png'),
      category: 'food',
      type: 'vocabulary',
      options: ['Pasta', 'Pizza', 'Burger', 'Sandwich'],
      correctAnswer: 1,
    },
    {
      id: 'voc-food2',
      word: 'Sushi',
      definition: 'A Japanese dish of prepared rice with fish, vegetables, or eggs.',
      pronunciation: '/ˈsuːʃi/',
      audioUrl: 'https://example.com/audio/sushi.mp3',
      imageUrl: require('../../../../assets/images/sushi.png'),
      category: 'food',
      type: 'vocabulary',
      options: ['Sushi', 'Ramen', 'Tempura', 'Sashimi'],
      correctAnswer: 0,
    },
  ];

  const filteredItems = illustrations.filter(
    (item) => item.type === activeType && item.category === activeCategory
  );

  const playSound = async (audioUrl: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl }
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleItemPress = (item: IllustrationItem) => {
    setSelectedItem(item);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (selectedItem && selectedItem.correctAnswer !== undefined) {
      setIsCorrect(index === selectedItem.correctAnswer);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const categories: { id: IllustrationCategory; label: string; icon: string }[] = [
    { id: 'animals', label: 'Animals', icon: '🐘' },
    { id: 'food', label: 'Food', icon: '🍔' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🖌 Interactive Illustrations</Text>
      
      <View style={styles.typeTabs}>
        <TouchableOpacity
          style={[styles.typeTab, activeType === 'dictionary' && styles.activeTypeTab]}
          onPress={() => setActiveType('dictionary')}
        >
          <Ionicons 
            name="book" 
            size={20} 
            color={activeType === 'dictionary' ? '#0066cc' : '#666'} 
          />
          <Text style={[
            styles.typeTabText, 
            activeType === 'dictionary' && styles.activeTypeTabText
          ]}>
            Picture Dictionary
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.typeTab, activeType === 'vocabulary' && styles.activeTypeTab]}
          onPress={() => setActiveType('vocabulary')}
        >
          <MaterialIcons 
            name="school" 
            size={20} 
            color={activeType === 'vocabulary' ? '#0066cc' : '#666'} 
          />
          <Text style={[
            styles.typeTabText, 
            activeType === 'vocabulary' && styles.activeTypeTabText
          ]}>
            Vocabulary Builder
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryLabel,
              activeCategory === category.id && styles.activeCategoryLabel
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView style={styles.itemsContainer}>
        <View style={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.illustrationItem}
              onPress={() => handleItemPress(item)}
            >
              <Image source={item.imageUrl} style={styles.itemImage} />
              {activeType === 'dictionary' && (
                <View style={styles.itemInfo}>
                  <Text style={styles.itemWord}>{item.word}</Text>
                  <Text style={styles.itemPronunciation}>{item.pronunciation}</Text>
                </View>
              )}
              {activeType === 'vocabulary' && (
                <View style={styles.itemInfo}>
                  <Text style={styles.itemQuestion}>What is this?</Text>
                  <MaterialIcons name="touch-app" size={24} color="#0066cc" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Dictionary Item Modal */}
      {selectedItem && selectedItem.type === 'dictionary' && (
        <Modal
          visible={!!selectedItem}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              
              <Image source={selectedItem.imageUrl} style={styles.modalImage} />
              
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalWord}>{selectedItem.word}</Text>
                  <Text style={styles.modalPronunciation}>{selectedItem.pronunciation}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.audioButton}
                  onPress={() => playSound(selectedItem.audioUrl)}
                >
                  <Ionicons name="volume-high" size={24} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalDefinition}>{selectedItem.definition}</Text>
              
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save to My Vocabulary</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      
      {/* Vocabulary Builder Modal */}
      {selectedItem && selectedItem.type === 'vocabulary' && (
        <Modal
          visible={!!selectedItem}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              
              <Image source={selectedItem.imageUrl} style={styles.modalImage} />
              
              <Text style={styles.quizQuestion}>What is this?</Text>
              
              <View style={styles.optionsContainer}>
                {selectedItem.options?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedOption === index && styles.selectedOption,
                      selectedOption === index && isCorrect && styles.correctOption,
                      selectedOption === index && !isCorrect && styles.incorrectOption,
                    ]}
                    onPress={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedOption === index && isCorrect && styles.correctOptionText,
                      selectedOption === index && !isCorrect && styles.incorrectOptionText,
                    ]}>
                      {option}
                    </Text>
                    
                    {selectedOption === index && isCorrect && (
                      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                    )}
                    
                    {selectedOption === index && !isCorrect && (
                      <Ionicons name="close-circle" size={24} color="#F44336" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              
              {selectedOption !== null && (
                <View style={styles.resultContainer}>
                  {isCorrect ? (
                    <Text style={styles.correctText}>Correct! 🎉</Text>
                  ) : (
                    <View>
                      <Text style={styles.incorrectText}>
                        Incorrect. The correct answer is:
                      </Text>
                      <Text style={styles.correctAnswerText}>
                        {selectedItem.options?.[selectedItem.correctAnswer || 0]}
                      </Text>
                    </View>
                  )}
                  
                  <TouchableOpacity
                    style={styles.hearPronunciationButton}
                    onPress={() => playSound(selectedItem.audioUrl)}
                  >
                    <Text style={styles.hearPronunciationText}>
                      Hear Pronunciation
                    </Text>
                    <Ionicons name="volume-high" size={20} color="#0066cc" />
                  </TouchableOpacity>
                </View>
              )}
              
              {selectedOption !== null && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={closeModal}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  typeTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTypeTab: {
    borderBottomColor: '#0066cc',
  },
  typeTabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTypeTabText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  activeCategoryButton: {
    backgroundColor: '#0066cc',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeCategoryLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemsContainer: {
    flex: 1,
    marginTop: 16,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  illustrationItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: 12,
    alignItems: 'center',
  },
  itemWord: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPronunciation: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemQuestion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalPronunciation: {
    fontSize: 16,
    color: '#666',
  },
  audioButton: {
    backgroundColor: '#0066cc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDefinition: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  quizQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  incorrectOptionText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  correctText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  incorrectText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  hearPronunciationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  hearPronunciationText: {
    color: '#0066cc',
    marginRight: 4,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InteractiveIllustrations; 