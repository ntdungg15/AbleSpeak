import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { fetchIllustrations, IllustrationItem, IllustrationCategory } from "@/api/NewLesson/illustrations";
import { styles } from "@/constants/newlesson/Video/Intereactive";

// Extended IllustrationItem type
interface EnhancedIllustrationItem extends IllustrationItem {
  examples?: string[];
}

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = 160;

const SimpleIllustrations: React.FC = () => {
  const [items, setItems] = useState<EnhancedIllustrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EnhancedIllustrationItem | null>(null);
  const [categories, setCategories] = useState<IllustrationCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<IllustrationCategory | null>(null);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    fetchIllustrations()
      .then(data => {
        // Cast to EnhancedIllustrationItem[]
        const enhancedData = data as EnhancedIllustrationItem[];
        setItems(enhancedData);
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(enhancedData.map(item => item.category))
        ) as IllustrationCategory[];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selected) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [selected]);

  const filteredItems = activeCategory 
    ? items.filter(item => item.category === activeCategory) 
    : items;

  const handleSelectItem = (item: EnhancedIllustrationItem) => {
    setSelected(item);
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelected(null);
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6a3093" />
        <Text style={styles.loaderText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>INTEREACTIVE ILLUSTRATIONS</Text>
        <Text style={styles.headerSubtitle}>Khám phá từ vựng qua hình ảnh</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => handleSelectItem(item)}
          >
            <View style={styles.cardImageContainer}>
              <Image source={{ uri: item.image.uri }} style={styles.thumb} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.cardGradient}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.word}</Text>
              {item.pronunciation && (
                <Text style={styles.pronunciation}>/{item.pronunciation}/</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
        visible={!!selected}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={closeModal}
      >
        <BlurView intensity={90} style={StyleSheet.absoluteFill} tint="dark">
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={closeModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            {selected && (
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: selected.image.uri }}
                  style={styles.modalImage}
                />

                <View style={styles.modalInfoContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalWord}>{selected.word}</Text>
                    {selected.pronunciation && (
                      <Text style={styles.modalPron}>/{selected.pronunciation}/</Text>
                    )}
                  </View>

                  <LinearGradient
                    colors={['#6a3093', '#a044ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.divider}
                  />

                  <ScrollView style={styles.modalDefinitionContainer}>
                    <Text style={styles.modalDef}>{selected.definition}</Text>
                    
                    {selected.examples && selected.examples.length > 0 && (
                      <View style={styles.examplesContainer}>
                        <Text style={styles.examplesTitle}>Ví dụ:</Text>
                        {selected.examples.map((example: string, index: number) => (
                          <View key={index} style={styles.exampleItem}>
                            <MaterialIcons name="format-quote" size={18} color="#6a3093" />
                            <Text style={styles.exampleText}>{example}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </ScrollView>

                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeBtn}
                  >
                    <LinearGradient
                      colors={['#6a3093', '#a044ff']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.closeBtnGradient}
                    >
                      <Text style={styles.closeText}>Đóng</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

export default SimpleIllustrations;

