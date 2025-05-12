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
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  FadeIn,
  FadeInDown,
  ZoomIn,
} from "react-native-reanimated";

import {styles} from "@/constants/newlesson/Video/Intereactive";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { fetchIllustrations } from "@/api/NewLesson/illustrations";

// Get screen dimensions
const { width, height } = Dimensions.get("window");
const isIOS = Platform.OS === "ios";

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
  const [showFeedback, setShowFeedback] = useState(false);

  // Animation values
  const imageOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.8);
  const modalOpacity = useSharedValue(0);
  const headerY = useSharedValue(-20);
  const headerOpacity = useSharedValue(0);
  const tabBarTranslateY = useSharedValue(50);

  useEffect(() => {
    headerY.value = withSpring(0, { damping: 12, stiffness: 90 });
    headerOpacity.value = withTiming(1, { duration: 800 });
    tabBarTranslateY.value = withSpring(0, { damping: 20, stiffness: 100 });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerY.value }],
    opacity: headerOpacity.value,
  }));

  const tabBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarTranslateY.value }],
  }));

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchIllustrations();
        console.log("Illustrations data loaded:", data ? data.length : 0);
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
    console.log("Item pressed:", item); // Debug
    setSelectedItem(item);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    modalScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    modalOpacity.value = withTiming(1, { duration: 300 });
    
    // Reset image animation values
    imageOpacity.value = 0;
    setIsImageLoading(true);
  };

  const handleCloseModal = () => {
    modalScale.value = withTiming(0.8, { duration: 250 });
    modalOpacity.value = withTiming(0, { duration: 250 });
    setTimeout(() => {
      setSelectedItem(null);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
    }, 300);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (selectedItem?.correctAnswer !== undefined) {
      const correct = index === selectedItem.correctAnswer;
      setIsCorrect(correct);
      
      // Show feedback after a short delay
      setTimeout(() => {
        setShowFeedback(true);
      }, 500);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    imageOpacity.value = withTiming(1, { duration: 400 });
  };

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  const categories = [
    { id: "animals", label: "Animals", icon: "paw" },
    { id: "food", label: "Food", icon: "hamburger" },
    { id: "travel", label: "Travel", icon: "plane" },
    { id: "nature", label: "Nature", icon: "leaf" },
    { id: "sports", label: "Sports", icon: "futbol" },
  ];

  const renderCategoryIcon = (icon: string) => {
    return <FontAwesome5 name={icon} size={22} color="white" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.headerContainer, {backgroundColor: '#4e4376'}]}>
        <Animated.View style={[styles.headerContent, headerStyle]}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="color-palette" size={28} color="#fff" />
          </View>
          <Text style={styles.headerText}>Interactive Illustrations</Text>
        </Animated.View>
      </View>

      {/* Type Selector */}
      <Animated.View style={[styles.typeTabsContainer, tabBarStyle]}>
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
              color={activeType === "dictionary" ? "#fff" : "#555"}
            />
            <Text
              style={[
                styles.typeTabText,
                activeType === "dictionary" && styles.activeTypeTabText,
              ]}
            >
              Dictionary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeTab,
              activeType === "vocabulary" && styles.activeTypeTab,
            ]}
            onPress={() => setActiveType("vocabulary")}
          >
            <Ionicons
              name="school"
              size={20}
              color={activeType === "vocabulary" ? "#fff" : "#555"}
            />
            <Text
              style={[
                styles.typeTabText,
                activeType === "vocabulary" && styles.activeTypeTabText,
              ]}
            >
              Vocabulary
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
          decelerationRate="fast"
          snapToInterval={width / 3.5}
        >
          {categories.map((category, index) => (
            <Animated.View 
              key={category.id}
              entering={FadeInDown.delay(100 + index * 100).springify()}
            >
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  activeCategory === category.id && styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory(category.id as IllustrationCategory)}
              >
                <View 
                  style={[
                    styles.categoryGradient, 
                    {
                      backgroundColor: activeCategory === category.id ? '#6a3093' : '#4e54c8'
                    }
                  ]}
                >
                  {renderCategoryIcon(category.icon)}
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Illustrations Grid */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.itemsGrid}>
          {filteredItems.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={ZoomIn.delay(100 + index * 80).springify()}
            >
              <TouchableOpacity
                style={styles.illustrationItem}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.imageShadow} />
                </View>
                {activeType === "dictionary" ? (
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemWord}>{item.word}</Text>
                    <Text style={styles.itemPronunciation}>{item.pronunciation}</Text>
                  </View>
                ) : (
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemQuestion}>What is this?</Text>
                    <MaterialIcons name="touch-app" size={22} color="#a044ff" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Dictionary Modal */}
      {activeType === "dictionary" && selectedItem && (
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="fade"
          onRequestClose={handleCloseModal}
          statusBarTranslucent
        >
          <View style={styles.modalOverlay}>
            {/* Conditional rendering for BlurView to avoid crashes if not available */}
            {Platform.OS === "ios" ? (
              <BlurView
                style={StyleSheet.absoluteFill}
                intensity={60}
                tint="dark"
              />
            ) : (
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
            )}
            <Animated.View
              style={[
                styles.dictionaryModalContent,
                {
                  transform: [{ scale: modalScale.value }],
                  opacity: modalOpacity.value,
                },
              ]}
            >
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Ionicons name="close-circle" size={30} color="#6a3093" />
              </TouchableOpacity>
              
              <View style={styles.wordHeader}>
                <Text style={styles.wordText}>{selectedItem.word}</Text>
                <Text style={styles.pronunciationText}>
                  {selectedItem.pronunciation}
                </Text>
              </View>
              
              <View style={styles.modalImageContainer}>
                {isImageLoading && (
                  <ActivityIndicator
                    style={styles.imageLoader}
                    color="#6a3093"
                    size="large"
                  />
                )}
                <Animated.Image
                  source={selectedItem.image}
                  style={[styles.modalImage, imageAnimatedStyle]}
                  onLoadStart={() => {
                    setIsImageLoading(true);
                    imageOpacity.value = 0;
                  }}
                  onLoad={handleImageLoad}
                />
              </View>
              
              <View style={styles.definitionContainer}>
                <Text style={styles.definitionTitle}>Definition</Text>
                <Text style={styles.definitionText}>
                  {selectedItem.definition}
                </Text>
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}

      {/* Vocabulary Builder Modal */}
      {activeType === "vocabulary" && selectedItem && (
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="fade"
          onRequestClose={handleCloseModal}
          statusBarTranslucent
        >
          <View style={styles.modalOverlay}>
            {/* Conditional rendering for BlurView to avoid crashes if not available */}
            {Platform.OS === "ios" ? (
              <BlurView
                style={StyleSheet.absoluteFill}
                intensity={60}
                tint="dark"
              />
            ) : (
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
            )}
            <Animated.View
              style={[
                styles.vocabularyModalContent,
                {
                  transform: [{ scale: modalScale.value }],
                  opacity: modalOpacity.value,
                },
              ]}
            >
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Ionicons name="close-circle" size={30} color="#6a3093" />
              </TouchableOpacity>
              
              <View style={styles.modalImageContainerVocab}>
                {isImageLoading && (
                  <ActivityIndicator
                    style={styles.imageLoader}
                    color="#6a3093"
                    size="large"
                  />
                )}
                <Animated.Image
                  source={selectedItem.image}
                  style={[styles.modalImage, imageAnimatedStyle]}
                  onLoadStart={() => {
                    setIsImageLoading(true);
                    imageOpacity.value = 0;
                  }}
                  onLoad={handleImageLoad}
                />
              </View>
              
              <Text style={styles.quizQuestion}>What is this?</Text>
              
              <View style={styles.optionsContainer}>
                {selectedItem.options?.map((option, idx) => (
                  <Animated.View 
                    key={idx}
                    entering={FadeIn.delay(300 + idx * 100).springify()}
                  >
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        selectedOption === idx && styles.selectedOption,
                        selectedOption === idx && isCorrect && styles.correctOption,
                        selectedOption === idx && isCorrect === false && styles.incorrectOption,
                      ]}
                      onPress={() => handleOptionSelect(idx)}
                      disabled={selectedOption !== null}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selectedOption === idx && isCorrect && styles.correctOptionText,
                          selectedOption === idx && isCorrect === false && styles.incorrectOptionText,
                        ]}
                      >
                        {option}
                      </Text>
                      {selectedOption === idx && (
                        isCorrect ? (
                          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                        ) : (
                          <Ionicons name="close-circle" size={24} color="#F44336" />
                        )
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
              
              {showFeedback && (
                <Animated.View 
                  style={styles.resultContainer}
                  entering={FadeInDown.springify()}
                >
                  {isCorrect ? (
                    <View style={[styles.feedbackGradient, {backgroundColor: '#43cea2'}]}>
                      <Text style={styles.correctText}>Excellent! 🎉</Text>
                      <Text style={styles.correctSubText}>
                        You identified the {selectedItem.word} correctly!
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.feedbackGradient, {backgroundColor: '#cb356b'}]}>
                      <Text style={styles.incorrectText}>
                        Not quite right
                      </Text>
                      <Text style={styles.incorrectSubText}>
                        The correct answer is:
                      </Text>
                      <Text style={styles.correctAnswerText}>
                        {selectedItem.options?.[selectedItem.correctAnswer || 0]}
                      </Text>
                    </View>
                  )}
                  
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleCloseModal}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.nextButtonGradient, {backgroundColor: '#6a3093'}]}>
                      <Text style={styles.nextButtonText}>Continue</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};


  

export default InteractiveIllustrations;