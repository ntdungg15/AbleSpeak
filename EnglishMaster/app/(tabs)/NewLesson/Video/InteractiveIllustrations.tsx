import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { fetchIllustrations } from "@/api/NewLesson/illustrations";
import { styles } from "@/constants/newlesson/Video/Intereactive";

// Types
type IllustrationType = "dictionary" | "vocabulary";
type IllustrationCategory = "animals" | "food" | "travel" | "nature" | "sports";

interface IllustrationItem {
  id: string;
  word: string;
  definition: string;
  pronunciation: string;
  image: { uri: string };
  category: IllustrationCategory;
  type: IllustrationType;
  options?: string[];
  correctAnswer?: number;
}

const InteractiveIllustrations: React.FC = () => {
  const [activeType, setActiveType] = useState<IllustrationType>("dictionary");
  const [activeCategory, setActiveCategory] = useState<IllustrationCategory>("animals");
  const [selectedItem, setSelectedItem] = useState<IllustrationItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [illustrations, setIllustrations] = useState<IllustrationItem[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Animation values
  const imageOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.8);
  const modalOpacity = useSharedValue(0);
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
    (async () => {
      try {
        const data = await fetchIllustrations();
        setIllustrations(data);
      } catch (error) {
        console.error("Failed to load illustrations:", error);
      }
    })();
  }, []);

  const filteredItems = illustrations.filter(
    (item) => item.type === activeType && item.category === activeCategory
  );

  const handleItemPress = (item: IllustrationItem) => {
    setSelectedItem(item);
    setSelectedOption(null);
    setIsCorrect(null);
    modalScale.value = withSpring(1);
    modalOpacity.value = withTiming(1);
  };

  const handleCloseModal = () => {
    modalScale.value = withTiming(0.8);
    modalOpacity.value = withTiming(0);
    setTimeout(() => {
      setSelectedItem(null);
      setSelectedOption(null);
      setIsCorrect(null);
    }, 300);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (selectedItem?.correctAnswer !== undefined) {
      setIsCorrect(index === selectedItem.correctAnswer);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    imageOpacity.value = withTiming(1, { duration: 300 });
  };

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  const categories = [
    { id: "animals", label: "Animals", icon: "🐘" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "nature", label: "Nature", icon: "🌲" },
    { id: "sports", label: "Sports", icon: "⚽" },
  ];

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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id as IllustrationCategory)}
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

      <ScrollView>
        <View style={styles.itemsGrid}>
          {filteredItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.illustrationItem}
              onPress={() => handleItemPress(item)}
            >
              <Image source={item.image} style={styles.itemImage} />
              {activeType === "dictionary" ? (
                <View style={styles.itemInfo}>
                  <Text style={styles.itemWord}>{item.word}</Text>
                  <Text style={styles.itemPronunciation}>{item.pronunciation}</Text>
                </View>
              ) : (
                <View style={styles.itemInfo}>
                  <Text style={styles.itemQuestion}>What is this?</Text>
                  <MaterialIcons name="touch-app" size={24} color="#0066cc" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Dictionary Modal */}
      {activeType === "dictionary" && selectedItem && (
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="none"
          onRequestClose={handleCloseModal}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={handleCloseModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ scale: modalScale.value }],
                opacity: modalOpacity.value,
              },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <View style={styles.modalHeader}>
              <Text style={styles.modalWord}>{selectedItem.word}</Text>
              <Text style={styles.modalPronunciation}>{selectedItem.pronunciation}</Text>
            </View>
            <View style={styles.imageContainer}>
              {isImageLoading && (
                <ActivityIndicator style={styles.imageLoader} color="#0066cc" size="large" />
              )}
              <Animated.Image
                source={{ uri: selectedItem.image.uri }}
                style={[styles.modalImage, imageAnimatedStyle]}
                onLoadStart={() => {
                  setIsImageLoading(true);
                  imageOpacity.value = 0;
                }}
                onLoad={handleImageLoad}
              />
            </View>
            <Text style={styles.modalDefinition}>{selectedItem.definition}</Text>
          </Animated.View>
        </Modal>
      )}

      {/* Vocabulary Builder Modal */}
      {activeType === "vocabulary" && selectedItem && (
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="none"
          onRequestClose={handleCloseModal}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={handleCloseModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ scale: modalScale.value }],
                opacity: modalOpacity.value,
              },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Image source={selectedItem.image} style={styles.modalImage} />
            <Text style={styles.quizQuestion}>What is this?</Text>
            <View style={styles.optionsContainer}>
              {selectedItem.options?.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.optionButton,
                    selectedOption === idx && styles.selectedOption,
                    selectedOption === idx &&
                      isCorrect &&
                      styles.correctOption,
                    selectedOption === idx &&
                      isCorrect === false &&
                      styles.incorrectOption,
                  ]}
                  onPress={() => handleOptionSelect(idx)}
                  disabled={selectedOption !== null}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === idx &&
                        isCorrect &&
                        styles.correctOptionText,
                      selectedOption === idx &&
                        isCorrect === false &&
                        styles.incorrectOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOption === idx &&
                    (isCorrect ? (
                      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                    ) : (
                      <Ionicons name="close-circle" size={24} color="#F44336" />
                    ))}
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
                      {selectedItem.options?.[
                        selectedItem.correctAnswer || 0
                      ]}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

export default InteractiveIllustrations;
