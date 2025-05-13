import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { styles } from '@/constants/newlesson/Video/VideoPlayer';

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
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [showControls, setShowControls] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  let hideControlsTimeout: NodeJS.Timeout | null = null;

  const resetHideControlsTimer = () => {
    if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      controlsOpacity.value = withTiming(0, { duration: 300 });
      controlsScale.value = withTiming(0.95, { duration: 300 });
      setShowControls(false);
    }, 3000); // 3 giây không tương tác sẽ ẩn nút
  };

  const handleVideoPress = () => {
    setShowControls(true);
    controlsOpacity.value = withTiming(1);
    controlsScale.value = withTiming(1);
    resetHideControlsTimer();
  };

  useEffect(() => {
    resetHideControlsTimer();
    return () => {
      if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
    };
  }, []);

  // Vocabulary and quiz data
  const vocabulary: VocabularyItem[] = params.vocabulary ? JSON.parse(params.vocabulary as string) : [];
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the main topic of this video?",
      options: [
        "Sports and exercise",
        params.title as string,
        "Weather patterns",
        "Technology trends",
      ],
      correctAnswer: 1,
    },
  ];
  const [currentQuizQuestion] = useState(0);

  // Animation values
  const controlsOpacity = useSharedValue(1);
  const controlsScale = useSharedValue(1);
  const quizScale = useSharedValue(0.8);
  const quizOpacity = useSharedValue(0);

  // Animated styles
  const controlsStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
    transform: [{ scale: controlsScale.value }],
  }));

  const quizStyle = useAnimatedStyle(() => ({
    opacity: quizOpacity.value,
    transform: [{ scale: quizScale.value }],
  }));

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setProgress(status.positionMillis / (status.durationMillis || 1));
    setDuration(status.durationMillis || 0);
    setCurrentTime(status.positionMillis);
    setIsPlaying(status.isPlaying);

    // Trigger quiz at 90%
    if (
      status.durationMillis &&
      status.positionMillis / status.durationMillis > 0.9 &&
      !quizCompleted
    ) {
      videoRef.current?.pauseAsync();
      setShowQuiz(true);
    }
  };

  const togglePlayPause = async () => {
    if (!videoRef.current) return;
    if (isPlaying) await videoRef.current.pauseAsync();
    else await videoRef.current.playAsync();
    setIsPlaying(!isPlaying);
    setShowControls(true);
    controlsOpacity.value = withTiming(1);
    controlsScale.value = withTiming(1);
  };

  const handleReplay = async () => {
    if (!videoRef.current) return;
    await videoRef.current.setPositionAsync(0);
    await videoRef.current.playAsync();
    setIsPlaying(true);
    setShowControls(true);
  };

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsAnswerCorrect(index === quizQuestions[currentQuizQuestion].correctAnswer);
  };

  const showQuizModal = () => {
    quizScale.value = withSpring(1);
    quizOpacity.value = withTiming(1, { duration: 300 });
  };

  const hideQuizModal = () => {
    quizScale.value = withSpring(0.8);
    quizOpacity.value = withTiming(0, { duration: 300 }, () => {
      setShowQuiz(false);
      setQuizCompleted(true);
      videoRef.current?.playAsync();
    });
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  const seekVideo = async (positionMillis: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(positionMillis);
    }
  };

  useEffect(() => {
    if (showQuiz) showQuizModal();
  }, [showQuiz]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/NewLesson/Video/ShortStoryClips')}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Video Section */}
      <View style={styles.videoContainer}>
        <TouchableOpacity
          style={styles.videoWrapper}
          activeOpacity={1}
          onPress={handleVideoPress}
        >
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: params.videoUrl as string }}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            useNativeControls={false}
            shouldPlay
          />

          {showControls && (
            <Animated.View style={[styles.controlsOverlay, controlsStyle]}>
              <View style={styles.topControls}>
                <Text style={styles.videoTitle}>{params.title}</Text>
              </View>
              <View style={styles.centerControls}>
                <TouchableOpacity onPress={togglePlayPause}>
                  <Ionicons
                    name={isPlaying ? 'pause-circle' : 'play-circle'}
                    size={70}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomControls}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <View
                  style={styles.progressBarContainer}
                  onLayout={(e) => setProgressBarWidth(e.nativeEvent.layout.width)}
                >
                  <TouchableOpacity
                    style={styles.progressBar}
                    onPress={(e) => {
                      if (progressBarWidth > 0) {
                        const touchX = e.nativeEvent.locationX;
                        const newPosition = (touchX / progressBarWidth) * duration;
                        seekVideo(newPosition);
                      }
                    }}
                  >
                    <View
                      style={[

                        { width: `${progress * 100}%` },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Ionicons name="expand" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.description}>{params.description}</Text>
        <Text style={styles.sectionTitle}>Vocabulary & Notes</Text>
        {vocabulary.map((item, idx) => {
          const translateY = useSharedValue(20);
          const itemOpacity = useSharedValue(0);
          const itemStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateY.value }],
            opacity: itemOpacity.value,
          }));
          useEffect(() => {
            translateY.value = withDelay(idx * 100, withTiming(0, { duration: 300 }));
            itemOpacity.value = withDelay(idx * 100, withTiming(1, { duration: 300 }));
          }, []);

          return (
            <Animated.View key={idx} style={[styles.vocabularyItem, itemStyle]}>
              <Text style={styles.vocabularyWord}>{item.word}</Text>
              <Text style={styles.vocabularyDefinition}>{item.definition}</Text>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* Quiz Modal */}
      <Modal visible={showQuiz} transparent animationType="none">
        <Animated.View style={[styles.quizModalContainer, quizStyle]}>
          <View style={styles.quizCard}>
            <Text style={styles.quizTitle}>Quick Quiz</Text>
            <Text style={styles.quizQuestion}>
              {quizQuestions[currentQuizQuestion].question}
            </Text>
            {quizQuestions[currentQuizQuestion].options.map((opt, i) => {
              const translateX = useSharedValue(50);
              const optOpacity = useSharedValue(0);
              const optStyle = useAnimatedStyle(() => ({
                transform: [{ translateX: translateX.value }],
                opacity: optOpacity.value,
              }));
              useEffect(() => {
                translateX.value = withDelay(i * 100, withSpring(0));
                optOpacity.value = withDelay(i * 100, withTiming(1, { duration: 300 }));
              }, []);

              return (
                <Animated.View key={i} style={optStyle}>
                  <TouchableOpacity
                    style={[
                      styles.quizOption,
                      selectedAnswer === i && styles.selectedOption,
                      selectedAnswer === i && isAnswerCorrect && styles.correctOption,
                      selectedAnswer === i && !isAnswerCorrect && styles.incorrectOption,
                    ]}
                    onPress={() => handleAnswerSelect(i)}
                    disabled={selectedAnswer !== null}
                  >
                    <Text
                      style={[
                        styles.quizOptionText,
                        selectedAnswer === i && isAnswerCorrect && styles.correctOptionText,
                        selectedAnswer === i && !isAnswerCorrect && styles.incorrectOptionText,
                      ]}
                    >
                      {opt}
                    </Text>
                    {selectedAnswer === i && isAnswerCorrect && (
                      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                    )}
                    {selectedAnswer === i && !isAnswerCorrect && (
                      <Ionicons name="close-circle" size={24} color="#F44336" />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
            {selectedAnswer !== null && (
              <TouchableOpacity style={styles.continueButton} onPress={hideQuizModal}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default VideoPlayer;