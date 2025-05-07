import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import { getLessonVocabulary } from '@/api/NewLesson/newlesson'; 
import { styles } from '@/constants/newlesson/vocabulary/vocabularyDetails';
type Phonetic = {
  text?: string;
  audio?: string;
};

type Definition = {
  definition: string;
  example?: string;
};

type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

type VocabularyWord = {
  id: string;
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  isLearned: boolean;
};

const LessonVocabulary = () => {
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const [vocabularyList, setVocabularyList] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchVocabularyData = async () => {
  //     if (!id) return;

  //     try {
  //       setLoading(true);
  //       const data = await getLessonVocabulary(id);
  //       setVocabularyList(data);
  //     } catch (error) {
  //       console.error('Error fetching lesson vocabulary:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVocabularyData();
  // }, [id]);

  const playAudio = async (audioUrl: string | undefined) => {
    if (!audioUrl) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleLearnedStatus = async (wordId: string) => {
    try {
      setVocabularyList(prev =>
        prev.map(word =>
          word.id === wordId ? { ...word, isLearned: !word.isLearned } : word
        )
      );
    } catch (error) {
      console.error('Error updating word status:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title || 'Danh sách từ vựng'}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress */}
      {!loading && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Đã thuộc: {vocabularyList.filter(w => w.isLearned).length}/{vocabularyList.length}
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${
                    vocabularyList.length > 0
                      ? (vocabularyList.filter(w => w.isLearned).length / vocabularyList.length) * 100
                      : 0
                  }%`,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Main Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <ScrollView style={styles.contentContainer}>
          {vocabularyList.length > 0 ? (
            vocabularyList.map((item) => (
              <View key={item.id} style={styles.wordContainer}>
                <View style={styles.wordHeader}>
                  <Text style={styles.word}>{item.word}</Text>
                  <TouchableOpacity
                    onPress={() => toggleLearnedStatus(item.id)}
                    style={[
                      styles.learnedButton,
                      item.isLearned ? styles.learnedButtonActive : {},
                    ]}
                  >
                    <Text style={styles.learnedButtonText}>
                      {item.isLearned ? '✓ Đã thuộc' : 'Chưa thuộc'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {item.phonetics.map((phonetic, index) => (
                  <View key={index} style={styles.phoneticContainer}>
                    {phonetic.text && (
                      <Text style={styles.phoneticText}>{phonetic.text}</Text>
                    )}
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
                        {definition.example && (
                          <Text style={styles.example}>
                            Ví dụ: {definition.example}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không có từ vựng nào cho bài học này</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fabButton}>
        <Text style={styles.fabText}>Ôn tập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



export default LessonVocabulary;