import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { Video } from 'expo-av';

const VideoIllustration: React.FC = () => {
  const videoRef = useRef<Video>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!status.isPlaying);
    }
  };

  const handleReplay = async () => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(0);
      videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleProgress = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        const currentProgress = (status.positionMillis / status.durationMillis) * 100;
        setProgress(currentProgress);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Illustration</Text>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: 'path-to-your-video.mp4' }}
        resizeMode="contain"
        onPlaybackStatusUpdate={handleProgress}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReplay}>
          <Text style={styles.buttonText}>Replay</Text>
        </TouchableOpacity>
      </View>
      <ProgressBarAndroid style={styles.progressBar} styleAttr="Horizontal" progress={progress / 100} />
      <Text style={styles.description}>
        Watch this video to improve your English listening and comprehension skills.
      </Text>
      <View style={styles.notes}>
        <Text style={styles.notesTitle}>Vocabulary & Notes</Text>
        <Text style={styles.notesList}>- Word 1: Definition or example sentence</Text>
        <Text style={styles.notesList}>- Word 2: Definition or example sentence</Text>
        <Text style={styles.notesList}>- Word 3: Definition or example sentence</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  progressBar: {
    width: '80%',
    height: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  notes: {
    width: '80%',
    textAlign: 'left',
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notesList: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default VideoIllustration;