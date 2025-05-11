import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { grammarQuestions, grammarQuestions1, grammarQuestions2, grammarQuestions3, grammarQuestions4, Question } from '../../../../constants/examination/grammarQuestions';

const getQuestionSet = (id: number) => {
  switch (id) {
    case 1:
      return grammarQuestions;
    case 2:
      return grammarQuestions1;
    case 3:
      return grammarQuestions2;
    case 4:
      return grammarQuestions3;
    case 5:
      return grammarQuestions4;
    default:
      return grammarQuestions;
  }
};

const AnswerScreen = () => {
  const { id, userAnswers } = useLocalSearchParams();
  const questionSet = getQuestionSet(Number(id));
  const parsedUserAnswers = userAnswers ? JSON.parse(userAnswers as string) : [];

  const isAnswerCorrect = (question: Question, userAnswer: string | string[]) => {
    if (question.type === 'multiple-choice') {
      return userAnswer === question.correctAnswer;
    } else {
      if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswers)) {
        return userAnswer.length === question.correctAnswers.length &&
          userAnswer.every((ans, index) => ans === question.correctAnswers[index]);
      }
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeInDown.duration(1000).springify()}
        style={styles.header}
      >
        <Text style={styles.title}>Detailed Answers</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        {questionSet.map((question, index) => {
          const userAnswer = parsedUserAnswers[index];
          const isCorrect = isAnswerCorrect(question, userAnswer);

          return (
            <Animated.View 
              key={index} 
              entering={FadeInUp.delay(index * 100).duration(500).springify()}
              style={[
                styles.questionContainer,
                !isCorrect && styles.incorrectQuestion
              ]}
            >
              <Text style={styles.questionNumber}>Question {index + 1}:</Text>
              <Text style={styles.questionText}>{question.question}</Text>
              
              <Animated.View 
                entering={FadeIn.delay(200).duration(500)}
                style={styles.answerContainer}
              >
                <Text style={styles.answerLabel}>Your answer:</Text>
                <Text style={[
                  styles.userAnswer,
                  !isCorrect && styles.incorrectAnswer
                ]}>
                  {Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer}
                </Text>
              </Animated.View>

              {!isCorrect && (
                <Animated.View 
                  entering={FadeIn.delay(300).duration(500)}
                  style={styles.answerContainer}
                >
                  <Text style={styles.answerLabel}>Correct answer:</Text>
                  <Text style={styles.correctAnswer}>
                    {question.type === 'multiple-choice' 
                      ? question.correctAnswer 
                      : question.correctAnswers.join(', ')}
                  </Text>
                </Animated.View>
              )}
            </Animated.View>
          );
        })}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  incorrectQuestion: {
    borderLeftColor: '#e74c3c',
    backgroundColor: '#fff5f5',
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
    lineHeight: 24,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  answerLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginRight: 10,
    fontWeight: '500',
  },
  userAnswer: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '500',
  },
  incorrectAnswer: {
    color: '#e74c3c',
    textDecorationLine: 'line-through',
  },
  correctAnswer: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '500',
  },
});

export default AnswerScreen; 