// app/vocabulary/review.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  VocabularyWord,
  getLessonVocabulary,
} from '@/api/NewLesson/Vocabulary';

export default function ReviewScreen() {
  const router = useRouter();
  const { lessonId, title } = useLocalSearchParams<{
    lessonId: string;
    title: string;
  }>();
  const [vocabList, setVocabList] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    fetchVocabulary();
  }, [lessonId]);

  const fetchVocabulary = async () => {
    try {
      setLoading(true);
      const data = await getLessonVocabulary(lessonId);
      if (data) {
        setVocabList(data);
      } else {
        Alert.alert('Lỗi', 'Không tải được từ vựng để ôn tập.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Lỗi', 'Không tải được từ vựng để ôn tập.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: VocabularyWord }) => (
    <View style={styles.card}>
      <Text style={styles.word}>{item.word}</Text>
      {item.translation && (
        <Text style={styles.translation}>Dịch: {item.translation}</Text>
      )}
      {item.meanings.map((m, mi) => (
        <View key={mi} style={styles.meaning}>
          <Text style={styles.partOfSpeech}>{m.partOfSpeech}</Text>
          {m.definitions.map((d, di) => (
            <View key={di} style={{ marginBottom: 6 }}>
              <Text style={styles.definition}>– {d.definition}</Text>
              {d.definition_vi && (
                <Text style={styles.definitionVi}>→ {d.definition_vi}</Text>
              )}
              {d.example && (
                <Text style={styles.example}>VD: {d.example}</Text>
              )}
              {d.example_vi && (
                <Text style={styles.exampleVi}>Ví dụ: {d.example_vi}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Ôn tập: {title ?? 'Vocabulary'}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Vocabulary List */}
      <FlatList
        data={vocabList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  back: { fontSize: 16, color: '#007BFF', width: 60 },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600' },
  list: { padding: 16 },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  word: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  meaning: { marginTop: 4 },
  partOfSpeech: { fontStyle: 'italic', marginBottom: 2 },
  definition: { marginLeft: 8 },
  translation: { color: '#008060', fontSize: 16, marginBottom: 4 },
  definitionVi: { color: '#444', fontSize: 15, marginLeft: 16, fontStyle: 'italic' },
  example: { color: '#555', marginLeft: 16 },
  exampleVi: { color: '#8a2be2', marginLeft: 16, fontStyle: 'italic' },
});
