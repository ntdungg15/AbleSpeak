import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

const ResultScreen = () => {
  const { score, totalQuestions, id } = useLocalSearchParams();

  // Ép kiểu về số, nếu không có thì mặc định là 0
  const scoreNum = Number(score) || 0;
  const totalQuestionsNum = Number(totalQuestions) || 0;

  const percentage = totalQuestionsNum > 0 ? (scoreNum / totalQuestionsNum) * 100 : 0;
  
  const getMessage = () => {
    if (percentage >= 80) return "Xuất sắc! Bạn đã làm rất tốt!";
    if (percentage >= 60) return "Tốt! Hãy tiếp tục cố gắng!";
    return "Hãy ôn tập thêm để cải thiện kết quả!";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Kết quả bài kiểm tra</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{scoreNum}/{totalQuestionsNum}</Text>
          <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.message}>{getMessage()}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.retryButton]}
            onPress={() => router.replace(`/examination/${id}`)}
          >
            <Text style={styles.buttonText}>Làm lại</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.homeButton]}
            onPress={() => router.push('/examination')}
          >
            <Text style={styles.buttonText}>Về trang kiểm tra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 40,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
  },
  percentageText: {
    fontSize: 24,
    color: '#7f8c8d',
    marginTop: 10,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  message: {
    fontSize: 20,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#3498db',
  },
  homeButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen; 