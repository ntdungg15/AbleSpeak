import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import examImage from '../../../assets/images/Frame-279398.png';

const examSets = [
  {
    id: 'grammar-1',
    title: 'Ngữ pháp cơ bản',
    description: 'Kiểm tra kiến thức ngữ pháp cơ bản',
    questions: 15,
    time: 15,
    image: examImage,
  },
  {
    id: 'grammar-2',
    title: 'Ngữ pháp nâng cao',
    description: 'Kiểm tra kiến thức ngữ pháp nâng cao',
    questions: 20,
    time: 20,
    image: examImage,
  },
  {
    id: 'vocabulary-1',
    title: 'Từ vựng cơ bản',
    description: 'Kiểm tra vốn từ vựng cơ bản',
    questions: 15,
    time: 15,
    image: examImage,
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
      <View style={styles.header}>
        <Text style={styles.title}>Kiểm tra kiến thức</Text>
        <Text style={styles.subtitle}>
          Chọn bộ đề để bắt đầu kiểm tra trình độ tiếng Anh của bạn
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {examSets.map((exam) => (
          <TouchableOpacity
            key={exam.id}
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
                <Text style={styles.examDetail}>• {exam.questions} câu hỏi</Text>
                <Text style={styles.examDetail}>• Thời gian: {exam.time} phút</Text>
              </View>
            </View>
          </TouchableOpacity>
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