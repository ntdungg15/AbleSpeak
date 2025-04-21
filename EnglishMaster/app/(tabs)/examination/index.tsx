import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';

const ExaminationScreen = () => {
  const handleStartExamination = () => {
    router.push({
      pathname: "/examination/grammar",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Kiểm tra kiến thức</Text>
          <Text style={styles.subtitle}>
            Hãy sẵn sàng để kiểm tra trình độ tiếng Anh của bạn!
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/Frame-279398.png')}
            style={[styles.image]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            • 15 câu hỏi ngữ pháp{'\n'}
            • Thời gian: 15 phút{'\n'}
            • Kiểm tra kiến thức ngữ pháp cơ bản
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartExamination}
        >
          <Text style={styles.startButtonText}>Bắt đầu</Text>
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginTop: 40,
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: '40%',
  },
  image: {
    width: 450,
    height: 450,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExaminationScreen; 