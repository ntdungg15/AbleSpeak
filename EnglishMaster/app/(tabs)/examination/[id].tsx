import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { grammarQuestions, Question } from '../../../constants/examination/grammarQuestions';
import { Ionicons } from '@expo/vector-icons';

interface Answer {
  type: 'multiple-choice' | 'fill-in-blank';
  selectedChoice?: string | null;
  selectedAnswers?: (string | null)[];
}

const ExaminationScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  const [allAnswers, setAllAnswers] = useState<Answer[]>([]);

  const currentQuestionData = grammarQuestions[currentQuestion];

  React.useEffect(() => {
    // Khôi phục câu trả lời đã lưu nếu có
    const savedAnswer = allAnswers[currentQuestion];
    if (savedAnswer) {
      if (savedAnswer.type === 'multiple-choice') {
        setSelectedChoice(savedAnswer.selectedChoice || null);
        setSelectedAnswers([]);
      } else {
        setSelectedAnswers(savedAnswer.selectedAnswers || []);
        setSelectedChoice(null);
      }
    } else {
      // Khởi tạo câu trả lời mới
      if (currentQuestionData.type === 'fill-in-blank') {
        setSelectedAnswers(new Array(currentQuestionData.blanks.length).fill(null));
        setSelectedChoice(null);
      } else {
        setSelectedChoice(null);
        setSelectedAnswers([]);
      }
    }
  }, [currentQuestion]);

  const handleSelectAnswer = (answer: string) => {
    if (currentQuestionData.type === 'fill-in-blank') {
      if (selectedAnswers.includes(answer)) {
        const newAnswers = selectedAnswers.map(ans => 
          ans === answer ? null : ans
        );
        setSelectedAnswers(newAnswers);
        // Lưu câu trả lời ngay khi chọn
        const newAllAnswers = [...allAnswers];
        newAllAnswers[currentQuestion] = {
          type: 'fill-in-blank',
          selectedAnswers: newAnswers
        };
        setAllAnswers(newAllAnswers);
      } else {
        const emptyIndex = selectedAnswers.findIndex(ans => ans === null);
        if (emptyIndex !== -1) {
          const newAnswers = [...selectedAnswers];
          newAnswers[emptyIndex] = answer;
          setSelectedAnswers(newAnswers);
          // Lưu câu trả lời ngay khi chọn
          const newAllAnswers = [...allAnswers];
          newAllAnswers[currentQuestion] = {
            type: 'fill-in-blank',
            selectedAnswers: newAnswers
          };
          setAllAnswers(newAllAnswers);
        }
      }
    } else if (currentQuestionData.type === 'multiple-choice') {
      setSelectedChoice(answer);
      // Lưu câu trả lời ngay khi chọn
      const newAllAnswers = [...allAnswers];
      newAllAnswers[currentQuestion] = {
        type: 'multiple-choice',
        selectedChoice: answer
      };
      setAllAnswers(newAllAnswers);
    }
  };

  const isWordSelectable = (word: string) => {
    if (selectedAnswers.includes(word)) {
      return true;
    }
    return selectedAnswers.includes(null);
  };

  const renderQuestion = () => {
    if (currentQuestionData.type === 'fill-in-blank') {
      const words = currentQuestionData.question.split(/\s+/);
      let blankIndex = 0;

      // Chia options thành 2 cột
      const leftColumnOptions = currentQuestionData.options.filter((_, index) => index % 2 === 0);
      const rightColumnOptions = currentQuestionData.options.filter((_, index) => index % 2 === 1);

      return (
        <>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              {words.map((word, index) => {
                if (word.includes('_____')) {
                  const currentBlankIndex = blankIndex;
                  const selectedWord = selectedAnswers[blankIndex];
                  blankIndex++;
                  
                  return (
                    <React.Fragment key={index}>
                      <TouchableOpacity 
                        style={styles.blankContainer}
                        onPress={() => {
                          if (selectedWord) {
                            handleSelectAnswer(selectedWord);
                          }
                        }}
                      >
                        <Text style={[
                          styles.blankText,
                          selectedWord ? styles.filledBlankText : styles.emptyBlankText
                        ]}>
                          {selectedWord || '_____'}
                        </Text>
                      </TouchableOpacity>
                      {' '}
                    </React.Fragment>
                  );
                }
                return word + ' ';
              })}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.optionsColumns}>
              {/* Cột trái */}
              <View style={styles.optionColumn}>
                {leftColumnOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index * 2}
                    style={[
                      styles.optionButton,
                      selectedAnswers.includes(option) && styles.selectedOption,
                      !isWordSelectable(option) && !selectedAnswers.includes(option) && styles.disabledOption
                    ]}
                    onPress={() => handleSelectAnswer(option)}
                    disabled={!isWordSelectable(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedAnswers.includes(option) ? styles.selectedOptionText : null,
                      !isWordSelectable(option) && !selectedAnswers.includes(option) ? styles.disabledOptionText : null
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Cột phải */}
              <View style={styles.optionColumn}>
                {rightColumnOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index * 2 + 1}
                    style={[
                      styles.optionButton,
                      selectedAnswers.includes(option) && styles.selectedOption,
                      !isWordSelectable(option) && !selectedAnswers.includes(option) && styles.disabledOption
                    ]}
                    onPress={() => handleSelectAnswer(option)}
                    disabled={!isWordSelectable(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedAnswers.includes(option) ? styles.selectedOptionText : null,
                      !isWordSelectable(option) && !selectedAnswers.includes(option) ? styles.disabledOptionText : null
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </>
      );
    } else if (currentQuestionData.type === 'multiple-choice') {
      return (
        <>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{currentQuestionData.question}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestionData.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  styles.multipleChoiceButton,
                  selectedChoice === option && styles.selectedOption
                ]}
                onPress={() => handleSelectAnswer(option)}
              >
                <View style={styles.choiceContainer}>
                  <View style={styles.radioButton}>
                    {selectedChoice === option && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.optionText,
                      styles.multipleChoiceText,
                      selectedChoice === option && styles.selectedOptionText
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );
    }
    return null;
  };

  const handleNext = () => {
    if (currentQuestion < grammarQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    grammarQuestions.forEach((question, index) => {
      const answer = allAnswers[index];
      if (!answer) return;

      if (question.type === 'multiple-choice') {
        if (answer.selectedChoice === question.correctAnswer) {
          score++;
        }
      } else if (question.type === 'fill-in-blank') {
        const isCorrect = answer.selectedAnswers?.every((selectedAnswer, i) => 
          selectedAnswer === question.correctAnswers[i]
        );
        if (isCorrect) {
          score++;
        }
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const unansweredQuestions = grammarQuestions.filter((_, index) => {
      const answer = allAnswers[index];
      if (!answer) return true;
      
      if (grammarQuestions[index].type === 'multiple-choice') {
        return !answer.selectedChoice;
      } else {
        return answer.selectedAnswers?.includes(null);
      }
    }).length;

    if (unansweredQuestions > 0) {
      Alert.alert(
        'Xác nhận nộp bài',
        `Bạn còn ${unansweredQuestions} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài?`,
        [
          {
            text: 'Hủy',
            style: 'cancel'
          },
          {
            text: 'Nộp bài',
            onPress: () => {
              const score = calculateScore();
              const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60);
              router.push({
                pathname: "/examination/result",
                params: {
                  score: score.toString(),
                  totalQuestions: grammarQuestions.length.toString(),
                  timeSpent: timeSpent.toString()
                }
              });
            }
          }
        ]
      );
    } else {
      const score = calculateScore();
      const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60);
      router.push({
        pathname: "/examination/result",
        params: {
          score: score.toString(),
          totalQuestions: grammarQuestions.length.toString(),
          timeSpent: timeSpent.toString()
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { marginLeft: 0 }]}>Kiểm tra</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.questionNumber}>
          Câu {currentQuestion + 1}/{grammarQuestions.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / grammarQuestions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {renderQuestion()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.navButtonText}>Trước</Text>
        </TouchableOpacity>

        {currentQuestion === grammarQuestions.length - 1 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.navButtonText}>Nộp bài</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText}>Tiếp</Text>
          </TouchableOpacity>
        )}
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 20,
  },
  optionsContainer: {
    padding: 10,
  },
  optionsColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  blankContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    minWidth: 80,
    marginHorizontal: 4,
    paddingHorizontal: 8,
    // display: 'inline-flex',
  },
  blankText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
  },
  emptyBlankText: {
    color: '#bdc3c7',
  },
  filledBlankText: {
    color: '#3498db',
    fontWeight: '500',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f5f9ff',
    borderColor: '#3498db',
  },
  disabledOption: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#3498db',
    fontWeight: '500',
  },
  disabledOptionText: {
    color: '#bdc3c7',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    marginBottom: 50
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  submitButton: {
    backgroundColor: '#27ae60',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2F80ED',
    borderRadius: 4,
  },
  questionContainer: {
    padding: 20,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3498db',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  multipleChoiceButton: {
    alignItems: 'flex-start',
  },
  multipleChoiceText: {
    textAlign: 'left',
  },
});

export default ExaminationScreen; 