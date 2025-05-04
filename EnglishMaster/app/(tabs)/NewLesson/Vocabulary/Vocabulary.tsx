import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
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

// Định nghĩa các bài học cố định
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
  const [lessonData, setLessonData] = useState<LessonItem[]>(lessons);
  const [translationMap, setTranslationMap] = useState<{ [key: string]: string }>({});
  const [definitionTranslations, setDefinitionTranslations] = useState<Record<string,string>>({});

  const handleSearch = async () => {
    if (!searchWord.trim()) return;
    setLoading(true);
    try {
      // 1) Lấy nguyên dữ liệu nghĩa
      const data = await getVocabulary(searchWord.trim());
      setSearchResults(data);

      // 2) Gom hết các câu cần dịch
      const texts = new Set<string>();
      data.forEach(item =>
        item.meanings.forEach(meaning =>
          meaning.definitions.forEach(def => def.definition && texts.add(def.definition))
        )
      );

      // 3) Dịch tuần tự
      const map: Record<string,string> = {};
      for (const txt of texts) {
        try {
          map[txt] = await getTranslation(txt);
        } catch {
          map[txt] = ''; // hoặc giữ nguyên txt
        }
      }
      setDefinitionTranslations(map);
    } catch (err) {
      console.error('Error searching or translating:', err);
      setSearchResults([]);
      setDefinitionTranslations({});
    } finally {
      setLoading(false);
    }
  };
  

  const playAudio = async (audioUrl: string | undefined) => {
    if (!audioUrl) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
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
      {/* Từ & phát âm */}
      <Text style={styles.word}>{item.word}</Text>
      {item.phonetics.map((p, i) => (
        <View key={i} style={styles.phoneticContainer}>
          {p.text && <Text style={styles.phoneticText}>{p.text}</Text>}
          {p.audio && (
            <TouchableOpacity onPress={() => playAudio(p.audio)}>
              <Text style={styles.audioButton}>🔊</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Định nghĩa + dịch */}
      {item.meanings.map((m, mi) => (
        <View key={mi} style={styles.meaningContainer}>
          {/* part-of-speech */}
          <Text style={styles.partOfSpeech}>{m.partOfSpeech}</Text>
          {/* (nếu cần dịch POS, bỏ khối này) */}
          
          {m.definitions.map((def, di) => (
            <View key={di} style={{ marginVertical: 4 }}>
              {/* Anh */}
              <Text style={styles.definition}>- {def.definition}</Text>
              {/* Việt */}
              {definitionTranslations[def.definition] !== undefined && (
                <Text style={styles.translationText}>
                  → {definitionTranslations[def.definition]}
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
        <TouchableOpacity><Text style={styles.menuIcon}>≡</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Học từ vựng cùng AbleSpeak</Text>
        <TouchableOpacity><Text style={styles.searchIcon}>🔍</Text></TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a word to search"
          value={searchWord}
          onChangeText={setSearchWord}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <ScrollView style={styles.contentContainer}>
          {/* Search Results */}
          {searchResults.map((item, idx) => (
            <View key={idx}>{renderSearchResults({ item })}</View>
          ))}

          {/* Lessons */}
          <View style={styles.lessonsContainer}>
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