import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  VocabularyWord,
  getLessonVocabulary,
  updateVocabularyLearnedStatus,
} from '@/api/NewLesson/Vocabulary';
import { styles } from '@/constants/newlesson/vocabulary/vocabularyDetails';

const LessonVocabulary: React.FC = () => {
  const router = useRouter();
  const { id, title } =
    useLocalSearchParams<{ id: string; title: string }>();
  const [vocabularyList, setVocabularyList] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchVocabulary = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getLessonVocabulary(id);
        setVocabularyList(data ?? []);
      } catch (error) {
        console.error('Error fetching lesson vocabulary:', error);
        Alert.alert(
          'Lỗi',
          'Không thể tải danh sách từ vựng. Vui lòng thử lại sau.',
          [{ text: 'OK' }]
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVocabulary();
  }, [id]);

  const playAudio = async (audioUrl: string) => {
    if (!audioUrl) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Lỗi', 'Không thể phát âm thanh.');
    }
  };

  const toggleLearned = async (
    wordId: string,
    currentStatus: boolean
  ) => {
    // optimistic UI update
    setVocabularyList((prev) =>
      prev.map((w) =>
        w.id === wordId ? { ...w, isLearned: !currentStatus } : w
      )
    );
    try {
      const updated = await updateVocabularyLearnedStatus(
        wordId,
        !currentStatus
      );
      if (!updated) throw new Error('No data returned');
      // reconcile with server response
      setVocabularyList((prev) =>
        prev.map((w) => (w.id === wordId ? updated : w))
      );
    } catch (error) {
      console.error('Error updating learned status:', error);
      // rollback
      setVocabularyList((prev) =>
        prev.map((w) =>
          w.id === wordId ? { ...w, isLearned: currentStatus } : w
        )
      );
      Alert.alert(
        'Lỗi',
        'Không thể cập nhật trạng thái từ vựng. Vui lòng thử lại sau.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleRefresh = async () => {
    if (!id) return;
    setRefreshing(true);
    try {
      const data = await getLessonVocabulary(id);
      setVocabularyList(data ?? []);
    } catch (error) {
      console.error('Error refreshing vocabulary:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const startReview = () => {
    if (vocabularyList.length > 0 && id && title) {
      router.push({
        pathname: '/(tabs)/NewLesson/Vocabulary/VocabularyReview',
        params: { lessonId: id, title },
      });
    } else {
      Alert.alert('Thông báo', 'Không có từ vựng để ôn tập');
    }
  };

  const learnedCount = vocabularyList.filter((w) => w.isLearned).length;
  const totalCount = vocabularyList.length;
  const progressPercent =
    totalCount > 0 ? (learnedCount / totalCount) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {title ?? 'Danh sách từ vựng'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress */}
      {!loading && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Đã thuộc: {learnedCount}/{totalCount}
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>
        </View>
      )}

      {/* Content */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007BFF"
          style={styles.loader}
        />
      ) : (
        <ScrollView
          style={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          {vocabularyList.length > 0 ? (
            vocabularyList.map((item) => (
              <View key={item.id} style={styles.wordContainer}>
                <View style={styles.wordHeader}>
                  <Text style={styles.word}>{item.word}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      toggleLearned(item.id, item.isLearned)
                    }
                    style={[
                      styles.learnedButton,
                      item.isLearned && styles.learnedButtonActive,
                    ]}
                  >
                    <Text style={styles.learnedButtonText}>
                      {item.isLearned ? '✓ Đã thuộc' : 'Chưa thuộc'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {item.phonetics.map((phonetic, idx) => (
                  <View
                    key={idx}
                    style={styles.phoneticContainer}
                  >
                    {phonetic.text && (
                      <Text style={styles.phoneticText}>
                        {phonetic.text}
                      </Text>
                    )}
                    {phonetic.audio && (
                      <TouchableOpacity
                        onPress={() =>
                          playAudio(phonetic.audio)
                        }
                      >
                        <Text style={styles.audioButton}>
                          🔊
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {item.meanings.map((meaning, mIdx) => (
                  <View
                    key={mIdx}
                    style={styles.meaningContainer}
                  >
                    <Text style={styles.partOfSpeech}>
                      {meaning.partOfSpeech}
                    </Text>
                    {meaning.definitions.map((def, dIdx) => (
                      <View
                        key={dIdx}
                        style={styles.definitionContainer}
                      >
                        <Text style={styles.definition}>
                          - {def.definition}
                        </Text>
                        {def.definition_vi && (
                          <Text style={{ color: '#008060', marginLeft: 16, fontStyle: 'italic' }}>
                            → {def.definition_vi}
                          </Text>
                        )}
                        {def.example && (
                          <Text style={styles.example}>
                            Ví dụ: {def.example}
                          </Text>
                        )}
                        {def.example_vi && (
                          <Text style={{ color: '#8a2be2', marginLeft: 16, fontStyle: 'italic' }}>
                            Ví dụ: {def.example_vi}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                ))}

                <Text style={{color: 'red'}}>Dịch: {item.translation}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Không có từ vựng cho bài học này
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Ôn tập */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={startReview}
      >
        <Text style={styles.fabText}>Ôn tập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LessonVocabulary;
