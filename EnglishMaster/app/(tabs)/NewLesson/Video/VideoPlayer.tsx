import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

interface VocabularyItem {
  word: string;
  definition: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const VideoPlayer: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const videoRef = useRef<Video>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  
  // Parse vocabulary from params
  const vocabulary: VocabularyItem[] = params.vocabulary ? JSON.parse(params.vocabulary as string) : [];
  
  // Sample quiz questions (in a real app, these would come from an API or database)
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the main topic of this video?",
      options: [
        "Sports and exercise",
        params.title as string,
        "Weather patterns",
        "Technology trends"
      ],
      correctAnswer: 1
    }
  ];
  
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);

  useEffect(() => {
    // Auto-hide controls after 5 seconds
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [showControls]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis / (status.durationMillis || 1));
      setDuration(status.durationMillis || 0);
      setCurrentTime(status.positionMillis);
      setIsPlaying(status.isPlaying);
      
      // Show quiz when video is 90% complete
      if (status.durationMillis && status.positionMillis / status.durationMillis > 0.9 && !quizCompleted) {
        if (!showQuiz) {
          videoRef.current?.pauseAsync();
          setShowQuiz(true);
        }
      }
    }
  };

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  };

  const handleReplay = async () => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(0);
      videoRef.current.playAsync();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handleSeek = async (value: number) => {
    if (videoRef.current && duration) {
      const newPosition = value * duration;
      await videoRef.current.setPositionAsync(newPosition);
      setShowControls(true);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsAnswerCorrect(index === quizQuestions[currentQuizQuestion].correctAnswer);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setQuizCompleted(true);
    videoRef.current?.playAsync();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.videoContainer}>
        <TouchableOpacity 
          style={styles.videoWrapper} 
          activeOpacity={1} 
          onPress={() => setShowControls(!showControls)}
        >
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: params.videoUrl as string }}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            useNativeControls={false}
            shouldPlay={true}
          />
          
          {showControls && (
            <View style={styles.controlsOverlay}>
              <View style={styles.topControls}>
                <Text style={styles.videoTitle}>{params.title}</Text>
              </View>
              
              <View style={styles.centerControls}>
                <TouchableOpacity onPress={togglePlayPause}>
                  <Ionicons 
                    name={isPlaying ? "pause-circle" : "play-circle"} 
                    size={70} 
                    color="white" 
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.bottomControls}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                  <View 
                    style={[
                      styles.progressThumb, 
                      { left: `${progress * 100}%` }
                    ]} 
                  />
                </View>
                
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
                
                <TouchableOpacity style={styles.replayButton} onPress={handleReplay}>
                  <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.description}>
          {params.description}
        </Text>
        
        <View style={styles.vocabularySection}>
          <Text style={styles.sectionTitle}>Vocabulary & Notes</Text>
          
          {vocabulary.map((item, index) => (
            <View key={index} style={styles.vocabularyItem}>
              <Text style={styles.vocabularyWord}>{item.word}</Text>
              <Text style={styles.vocabularyDefinition}>{item.definition}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <Modal
        visible={showQuiz}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.quizModalContainer}>
          <View style={styles.quizCard}>
            <Text style={styles.quizTitle}>Quick Quiz</Text>
            <Text style={styles.quizQuestion}>
              {quizQuestions[currentQuizQuestion].question}
            </Text>
            
            {quizQuestions[currentQuizQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quizOption,
                  selectedAnswer === index && styles.selectedOption,
                  selectedAnswer === index && isAnswerCorrect && styles.correctOption,
                  selectedAnswer === index && !isAnswerCorrect && styles.incorrectOption,
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.quizOptionText,
                  selectedAnswer === index && isAnswerCorrect && styles.correctOptionText,
                  selectedAnswer === index && !isAnswerCorrect && styles.incorrectOptionText,
                ]}>
                  {option}
                </Text>
                
                {selectedAnswer === index && isAnswerCorrect && (
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                )}
                
                {selectedAnswer === index && !isAnswerCorrect && (
                  <Ionicons name="close-circle" size={24} color="#F44336" />
                )}
              </TouchableOpacity>
            ))}
            
            {selectedAnswer !== null && (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleQuizComplete}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: 16,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  videoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
    borderRadius: 2,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0066cc',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#0066cc',
    borderRadius: 6,
    top: -4,
    marginLeft: -6,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
  replayButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  vocabularySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  vocabularyItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  vocabularyWord: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 4,
  },
  vocabularyDefinition: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quizModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  quizQuestion: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: '#F44336',
  },
  quizOptionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  incorrectOptionText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoPlayer; 