import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import grammarBasicImage from '../../../assets/images/grammar.png';
import vocabularyPracticeImage from '../../../assets/images/vocabulary.png';
import readingComprehensionImage from '../../../assets/images/reading.png';
import mixedTopicsImage from '../../../assets/images/examination.png';

const examSets = [
  {
    id: 'grammar-1',
    title: 'Set 1: Basic Grammar & Vocabulary',
    description: 'Test your basic grammar and vocabulary knowledge.',
    questions: 10,
    image: grammarBasicImage
  },
  {
    id: 'grammar-2',
    title: 'Set 2: Vocabulary & Practical Questions',
    description: 'Test vocabulary, grammar and practical knowledge.',
    questions: 10,
    image: vocabularyPracticeImage,
  },
  {
    id: 'grammar-3',
    title: 'Set 3: Reading Comprehension & Extended Vocabulary',
    description: 'Practice reading comprehension, vocabulary and comprehensive knowledge.',
    questions: 10,
    image: readingComprehensionImage,
  },
  {
    id: 'grammar-4',
    title: 'Set 4: Various Topics',
    description: 'Test your knowledge across different topics.',
    questions: 10,
    image: mixedTopicsImage,
  },
];

const ExaminationScreen = () => {
  const handleStartExamination = (examId: string) => {
    router.push({
      pathname: "/examination/[id]",
      params: { id: examId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeInDown.duration(1000).springify()}
        style={styles.header}
      >
        <Text style={styles.title}>Knowledge Test</Text>
        <Text style={styles.subtitle}>
          Choose a test set to start checking your English proficiency
        </Text>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        {examSets.map((exam, index) => (
          <Animated.View
            key={exam.id}
            entering={FadeInUp.delay(index * 200).duration(1000).springify()}
          >
            <TouchableOpacity
              style={styles.examCard}
              onPress={() => handleStartExamination(exam.id)}
            >
              <Image 
                source={exam.image}
                style={styles.examImage}
                resizeMode="contain"
              />
              <View style={styles.examInfo}>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examDescription}>{exam.description}</Text>
                <View style={styles.examDetails}>
                  <Text style={styles.examDetail}>• {exam.questions} questions</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  examCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  examImage: {
    width: '100%',
    height: 150,
  },
  examInfo: {
    padding: 15,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  examDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  examDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  examDetail: {
    fontSize: 14,
    color: '#34495e',
  },
});

export default ExaminationScreen; 