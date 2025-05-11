import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import excellentImage from '../../../assets/images/excellent.png';
import goodImage from '../../../assets/images/good.png';
import keepTryingImage from '../../../assets/images/bad.png';

const ResultScreen = () => {
  const { score, totalQuestions, id, userAnswers } = useLocalSearchParams();

  // Ép kiểu về số, nếu không có thì mặc định là 0
  const scoreNum = Number(score) || 0;
  const totalQuestionsNum = Number(totalQuestions) || 0;

  const percentage = totalQuestionsNum > 0 ? (scoreNum / totalQuestionsNum) * 100 : 0;
  
  const getMessage = () => {
    if (percentage >= 80) return "Excellent! You did very well!";
    if (percentage >= 60) return "Good! Keep up the good work!";
    return "Keep practicing to improve your results!";
  };

  const getResultImage = () => {
    if (percentage >= 80) return excellentImage;
    if (percentage >= 60) return goodImage;
    return keepTryingImage;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeInDown.duration(1000).springify()}
        style={styles.content}
      >
        <Animated.Text 
          entering={FadeIn.delay(200).duration(500)}
          style={styles.title}
        >
          Test Results
        </Animated.Text>
        
        <Animated.View 
          entering={FadeIn.delay(400).duration(500)}
          style={styles.scoreContainer}
        >
          <Text style={styles.scoreText}>{scoreNum}/{totalQuestionsNum}</Text>
          <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
        </Animated.View>

        <Animated.Image 
          entering={FadeIn.delay(600).duration(500)}
          source={getResultImage()}
          style={styles.resultImage}
          resizeMode="contain"
        />

        <Animated.View 
          entering={FadeIn.delay(800).duration(500)}
          style={styles.detailsContainer}
        >
          <Text style={styles.message}>{getMessage()}</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(1000).duration(500).springify()}
          style={styles.buttonContainer}
        >
          <TouchableOpacity 
            style={[styles.button, styles.retryButton]}
            onPress={() => router.replace(`/examination/${id}`)}
          >
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.answerButton]}
            onPress={() => router.push({
              pathname: '/examination/answers/[id]',
              params: { id, userAnswers }
            })}
          >
            <Text style={styles.buttonText}>View Answers</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
    marginVertical: 20,
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
  resultImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
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
    marginBottom: 30,
    marginTop: -10  
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
  answerButton: {
    backgroundColor: '#e67e22',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen; 