import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { getVocabulary, getTranslation } from '@/api/NewLesson/newlesson';
import { styles } from '@/constants/newlesson/vocabulary/vocabulary';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

type Phonetic = {
  text?: string;
  audio?: string;
};

type Definition = {
  definition: string;
  translation?: string; 
};

type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

type VocabularyItem = {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
};

type LessonItem = {
  id: string;
  title: string;
  image: any;
  progress: number;
  totalWords: number;
};

const lessons: LessonItem[] = [
  {
    id: 'self-introduction',
    title: 'Bài 1: Giới thiệu bản thân',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279147/mau-gioi-thieu-ban-than-bang-tieng-viet_pprnkv.png' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'family',
    title: 'Bài 2: Gia đình',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279146/family_cpdt0s.jpg' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'appearance-description',
    title: 'Bài 3: Miêu tả ngoại hình',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279146/ngo%E1%BA%A1i_h%C3%ACnh_nb4bh0.png' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'jobs',
    title: 'Bài 4: Nghề nghiệp',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279148/ngh%E1%BB%81_nghi%E1%BB%87p_e8fc2p.png' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'character',
    title: 'Bài 5: Tính cách con người',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279146/t%C3%ADnh_c%C3%A1ch_dypbdt.jpg' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'transportation',
    title: 'Bài 6: Giao thông',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279150/giao_th%C3%B4ng_zeg8zo.jpg' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'food',
    title: 'Bài 7: Đồ ăn',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279147/%C4%91%E1%BB%93_%C4%83n_vga6j0.png' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'hobbies',
    title: 'Bài 8: Sở thích',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279147/s%E1%BB%9F_th%C3%ADch_brbty8.jpg' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'weather',
    title: 'Bài 9: Thời tiết',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279147/th%E1%BB%9Di_ti%E1%BA%BFt_qbzdxu.jpg' },
    progress: 0,
    totalWords: 20
  },
  {
    id: 'colors',
    title: 'Bài 10: Màu sắc',
    image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746279146/m%C3%A0u_s%E1%BA%AFc_spcu2b.jpg' },
    progress: 0,
    totalWords: 20
  }
];

const Vocabulary = () => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [lessonData, setLessonData] = useState<LessonItem[]>(lessons);
  const [showTranslation, setShowTranslation] = useState(true); 
  const handleSearch = async () => {
    if (searchWord.trim() !== '') {
      try {
        setLoading(true);
        const data = await getVocabulary(searchWord.trim());
        setSearchResults(data);

        if (showTranslation && data.length > 0) {
          await translateDefinitions(data);
        }
      } catch (error) {
        console.error('Error searching vocabulary:', error);
        setSearchResults([]);
        Alert.alert('Error', 'Failed to search for the word. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const translateDefinitions = async (vocabularyItems: VocabularyItem[]) => {
    try {
      setTranslating(true);
      const updatedItems = [...vocabularyItems];

      for (let itemIndex = 0; itemIndex < updatedItems.length; itemIndex++) {
        const item = updatedItems[itemIndex];

        for (let meaningIndex = 0; meaningIndex < item.meanings.length; meaningIndex++) {
          const meaning = item.meanings[meaningIndex];

          for (let defIndex = 0; defIndex < meaning.definitions.length; defIndex++) {
            const def = meaning.definitions[defIndex];
            const translatedText = await getTranslation(def.definition);
            if (translatedText) {
              meaning.definitions[defIndex] = {
                ...def,
                translation: translatedText
              };
            }
          }
        }
      }

      setSearchResults(updatedItems);
    } catch (error) {
      console.error('Error translating definitions:', error);
      Alert.alert('Translation Error', 'Failed to translate definitions. Check your connection.');
    } finally {
      setTranslating(false);
    }
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
    if (!showTranslation && searchResults.length > 0) {
      translateDefinitions(searchResults);
    }
  };

  const playAudio = async (audioUrl: string | undefined) => {
    if (!audioUrl) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Audio Error', 'Could not play pronunciation audio.');
    }
  };

  const handleLessonPress = (lessonId: string, lessonTitle: string) => {
    router.push({
      pathname: `/(tabs)/NewLesson/Vocabulary/VocabularyDetail`,
      params: { title: lessonTitle }
    });
  };

  const renderSearchResults = ({ item }: { item: VocabularyItem }) => (
    <View style={styles.searchResultItem}>
      <Text style={styles.word}>{item.word}</Text>
      {item.phonetics.map((phonetic, index) => (
        <View key={index} style={styles.phoneticContainer}>
          {phonetic.text && <Text style={styles.phoneticText}>{phonetic.text}</Text>}
          {phonetic.audio && (
            <TouchableOpacity onPress={() => playAudio(phonetic.audio)}>
              <Text style={styles.audioButton}>🔊</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      {item.meanings.map((meaning, index) => (
        <View key={index} style={styles.meaningContainer}>
          <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
          {meaning.definitions.map((definition, defIndex) => (
            <View key={defIndex} style={styles.definitionContainer}>
              <Text style={styles.definition}>
                - {definition.definition}
              </Text>
              {showTranslation && definition.translation && (
                <Text style={styles.translationText}>
                  {definition.translation}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const renderLessonItem = ({ item }: { item: LessonItem }) => (
    <TouchableOpacity
      style={styles.lessonContainer}
      onPress={() => handleLessonPress(item.id, item.title)}
    >
      {/* Hiển thị hình ảnh */}
      <Image source={{ uri: item.image.uri }} style={styles.lessonImage} />
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Đã thuộc: {item.progress}/{item.totalWords}
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${(item.progress / item.totalWords) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={(e) => {
          e.stopPropagation(); 
        }}
      >
        <Text style={styles.downloadIcon}>⬇️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Học từ vựng cùng AbleSpeak</Text>
        <TouchableOpacity style={styles.searchIconButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar and Translation Toggle */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a word to search"
          value={searchWord}
          onChangeText={setSearchWord}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Translation Toggle Button */}
      <View style={styles.translationToggleContainer}>
        <TouchableOpacity
          style={[
            styles.translationToggleButton,
            showTranslation ? styles.translationActive : styles.translationInactive
          ]}
          onPress={toggleTranslation}
        >
          <Text style={styles.translationToggleText}>
            {showTranslation ? "Ẩn bản dịch" : "Hiện bản dịch"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      {(loading || translating) ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>
            {loading ? "Đang tìm kiếm..." : "Đang dịch..."}
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.contentContainer}>
          {/* Search Results */}
          {searchResults.length > 0 && (
            <View style={styles.searchResultsContainer}>
              {searchResults.map((item, index) => (
                <View key={index}>
                  {renderSearchResults({ item })}
                </View>
              ))}
            </View>
          )}

          {/* No Results Message */}
          {searchWord.trim() !== '' && searchResults.length === 0 && !loading && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                Không tìm thấy từ "{searchWord}". Vui lòng thử lại.
              </Text>
            </View>
          )}

          {/* Lessons */}
          <View style={styles.lessonsContainer}>
            <Text style={styles.sectionTitle}>Các bài học từ vựng</Text>
            {lessonData.map((item) => (
              <View key={item.id}>
                {renderLessonItem({ item })}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Vocabulary;