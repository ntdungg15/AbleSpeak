import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { illustrationData } from "@/api/NewLesson/illustrations";
import { fetchIllustrations } from "@/api/NewLesson/illustrations";
import { getVocabulary } from "@/api/NewLesson/newlesson";

import { styles } from "@/constants/newlesson/Video/Intereactive";
// Types
type IllustrationType = "dictionary" | "vocabulary";
type IllustrationCategory = "animals" | "food" | "travel" | "nature" | "sports";

interface IllustrationItem {
  id: string;
  word: string;
  definition: string;
  pronunciation: string;
  audioUrl: string;
  image: { uri: string };
  category: IllustrationCategory;
  type: IllustrationType;
  options?: string[];
  correctAnswer?: number;
}

// Cache để lưu kết quả API
const audioCache = new Map<string, string>();

// Hàm delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm để lấy audio URL với cache
async function getAudioUrlWithCache(word: string): Promise<string> {
  // Kiểm tra cache trước
  if (audioCache.has(word)) {
    console.log('Using cached audio URL for:', word);
    return audioCache.get(word) || '';
  }

  try {
    // Thêm delay cố định 500ms giữa các request
    await delay(500);
    
    const data = await getVocabulary(word);
    console.log('Raw API response for', word, ':', JSON.stringify(data, null, 2));
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn('Invalid API response for word:', word);
      return '';
    }

    const entry = data[0];
    if (!entry.phonetics || !Array.isArray(entry.phonetics)) {
      console.warn('No phonetics data for word:', word);
      return '';
    }

    // Tìm audio URL hợp lệ
    let audioUrl = '';
    for (const phonetic of entry.phonetics) {
      if (phonetic?.audio?.trim()) {
        try {
          new URL(phonetic.audio); // Validate URL
          audioUrl = phonetic.audio;
          break;
        } catch (e) {
          console.warn('Invalid audio URL:', phonetic.audio);
        }
      }
    }

    // Cache kết quả
    audioCache.set(word, audioUrl);
    return audioUrl;
  } catch (error) {
    console.error('Failed to get audio URL for', word, ':', error);
    return '';
  }
}

// Hàm để xử lý từng batch items
async function processBatch(items: IllustrationItem[], batchSize: number = 3) {
  const results: IllustrationItem[] = [...items];
  
  // Xử lý theo từng batch
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (item) => {
        try {
          const audioUrl = await getAudioUrlWithCache(item.word);
          if (audioUrl) {
            const index = results.findIndex(r => r.id === item.id);
            if (index !== -1) {
              results[index] = { ...results[index], audioUrl };
            }
          }
        } catch (error) {
          console.warn(`Failed to process item ${item.word}:`, error);
        }
      })
    );
  }
  
  return results;
}

const InteractiveIllustrations: React.FC = () => {
  const [activeType, setActiveType] = useState<IllustrationType>("dictionary");
  const [activeCategory, setActiveCategory] =
    useState<IllustrationCategory>("animals");
  const [selectedItem, setSelectedItem] = useState<IllustrationItem | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [illustrations, setIllustrations] = useState<IllustrationItem[]>([]);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const modalScale = useSharedValue(0.8);
  const modalOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: modalScale.value }],
    opacity: modalOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };
  const globalScale = useSharedValue(1);
  const globalOpacity = useSharedValue(1);

  const touchStyle = useAnimatedStyle(() => ({
    transform: [{ scale: globalScale.value }],
    opacity: globalOpacity.value,
  }));
  const headerY = useSharedValue(-20);
  const headerOpacity = useSharedValue(0);

  useEffect(() => {
    headerY.value = withSpring(0);
    headerOpacity.value = withTiming(1, { duration: 500 });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerY.value }],
    opacity: headerOpacity.value,
  }));

  useEffect(() => {
    const loadIllustrations = async () => {
      try {
        const data = (await fetchIllustrations()) as IllustrationItem[];
        // Set data ban đầu
        setIllustrations(data.map(item => ({
          ...item,
          audioUrl: '' // Reset audioUrl ban đầu
        })));

        // Xử lý theo batch
        const enriched = await processBatch(data, 3);
        setIllustrations(enriched);
      } catch (error) {
        console.error("Failed to load illustrations:", error);
      }
    };

    loadIllustrations();
  }, []);
  

  const filteredItems = illustrations.filter(
    (item: IllustrationItem) => item.type === activeType && item.category === activeCategory
  );

  const playSound = async (audioUrl: string) => {
    try {
      if (!audioUrl) {
        console.warn('No audio URL available');
        return;
      }

      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: audioUrl,
      });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleItemPress = async (orig: IllustrationItem) => {
    setSelectedOption(null);
    setIsCorrect(null);

    // Show modal ngay với data hiện tại
    setSelectedItem(orig);
    modalScale.value = withSpring(1);
    modalOpacity.value = withTiming(1);

    // Thử lấy audio URL mới nếu chưa có
    if (!orig.audioUrl) {
      try {
        const audioUrl = await getAudioUrlWithCache(orig.word);
        if (audioUrl) {
          setSelectedItem(prev => prev ? {
            ...prev,
            audioUrl
          } : null);
        }
      } catch (error) {
        console.warn(`Failed to get audio for ${orig.word}:`, error);
      }
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (selectedItem && selectedItem.correctAnswer !== undefined) {
      setIsCorrect(index === selectedItem.correctAnswer);
    }
  };

  const closeModal = () => {
    modalScale.value = withSpring(0.8);
    modalOpacity.value = withTiming(0);
    setTimeout(() => {
      setSelectedItem(null);
      setSelectedOption(null);
      setIsCorrect(null);
      modalScale.value = 0.8;
      modalOpacity.value = 0;
    }, 300);
  };

  const categories: {
    id: IllustrationCategory;
    label: string;
    icon: string;
  }[] = [
    { id: "animals", label: "Animals", icon: "🐘" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "nature", label: "Nature", icon: "🌲" },
    { id: "sports", label: "Sports", icon: "⚽" },
  ];

  const renderIllustrationItem = ({
    item,
    index,
  }: {
    item: IllustrationItem;
    index: number;
  }) => (
    <Animated.View
      key={item.id}
      style={[
        styles.illustrationItem,
        { transform: [{ translateY: index * 10 }] }, // Giảm giá trị translateY từ 20 xuống 10
        touchStyle,
      ]}
    >
      <TouchableOpacity
        onPressIn={() => {
          globalScale.value = withSpring(0.95);
          globalOpacity.value = withTiming(0.8);
        }}
        onPressOut={() => {
          globalScale.value = withSpring(1);
          globalOpacity.value = withTiming(1);
        }}
        onPress={() => handleItemPress(item)}
      >
        <Image source={item.image} style={styles.itemImage} />
        {activeType === "dictionary" && (
          <View style={styles.itemInfo}>
            <Text style={styles.itemWord}>{item.word}</Text>
            <Text style={styles.itemPronunciation}>{item.pronunciation}</Text>
          </View>
        )}
        {activeType === "vocabulary" && (
          <View style={styles.itemInfo}>
            <Text style={styles.itemQuestion}>What is this?</Text>
            <MaterialIcons name="touch-app" size={24} color="#0066cc" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.header, headerStyle]}>
        🖌 Interactive Illustrations
      </Animated.Text>

      <View style={styles.typeTabs}>
        <TouchableOpacity
          style={[
            styles.typeTab,
            activeType === "dictionary" && styles.activeTypeTab,
          ]}
          onPress={() => setActiveType("dictionary")}
        >
          <Ionicons
            name="book"
            size={20}
            color={activeType === "dictionary" ? "#0066cc" : "#666"}
          />
          <Text
            style={[
              styles.typeTabText,
              activeType === "dictionary" && styles.activeTypeTabText,
            ]}
          >
            Picture Dictionary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeTab,
            activeType === "vocabulary" && styles.activeTypeTab,
          ]}
          onPress={() => setActiveType("vocabulary")}
        >
          <MaterialIcons
            name="school"
            size={20}
            color={activeType === "vocabulary" ? "#0066cc" : "#666"}
          />
          <Text
            style={[
              styles.typeTabText,
              activeType === "vocabulary" && styles.activeTypeTabText,
            ]}
          >
            Vocabulary Builder
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryLabel,
                activeCategory === category.id && styles.activeCategoryLabel,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView >
        <View style={styles.itemsGrid}>
          {filteredItems.map((item: IllustrationItem, index: number) =>
            renderIllustrationItem({ item, index })
          )}
        </View>
      </ScrollView>

      {/* Dictionary Item Modal */}
      {selectedItem && selectedItem.type === "dictionary" && (
        <Modal
          visible={!!selectedItem}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}
        >
          <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>

              <Image source={selectedItem.image} style={styles.modalImage} />

              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalWord}>{selectedItem.word}</Text>
                  <Text style={styles.modalPronunciation}>
                    {selectedItem.pronunciation}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={() => playSound(selectedItem.audioUrl)}
                >
                  <Ionicons name="volume-high" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalDefinition}>
                {selectedItem.definition}
              </Text>

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save to My Vocabulary</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      )}

      {/* Vocabulary Builder Modal */}
      {selectedItem && selectedItem.type === "vocabulary" && (
        <Modal
          visible={!!selectedItem}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}
        >
          <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>

              <Image source={selectedItem.image} style={styles.modalImage} />

              <Text style={styles.quizQuestion}>What is this?</Text>

              <View style={styles.optionsContainer}>
                {selectedItem.options?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedOption === index && styles.selectedOption,
                      selectedOption === index &&
                        isCorrect &&
                        styles.correctOption,
                      selectedOption === index &&
                        !isCorrect &&
                        styles.incorrectOption,
                    ]}
                    onPress={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === index &&
                          isCorrect &&
                          styles.correctOptionText,
                        selectedOption === index &&
                          !isCorrect &&
                          styles.incorrectOptionText,
                      ]}
                    >
                      {option}
                    </Text>

                    {selectedOption === index && isCorrect && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#4CAF50"
                      />
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
                        {
                          selectedItem.options?.[
                            selectedItem.correctAnswer || 0
                          ]
                        }
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
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

export default InteractiveIllustrations;
