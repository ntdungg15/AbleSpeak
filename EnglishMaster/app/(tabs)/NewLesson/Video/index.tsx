import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const VideoIllustrationsHome: React.FC = () => {
  const router = useRouter();

  const categories = [
    {
      id: 'illustration-videos',
      title: '🎬 Illustration Videos',
      description: 'Visual storytelling and grammar animations to help you learn English concepts through engaging videos.',
      icon: <Ionicons name="videocam" size={40} color="#0066cc" />,
      route: '/NewLesson/Video/IllustrationVideos',
      image: require('../../../../assets/images/illustration-video-placeholder.png'),
    },
    {
      id: 'interactive-illustrations',
      title: '🖌 Interactive Illustrations',
      description: 'Picture dictionary and visual vocabulary builder with interactive elements.',
      icon: <MaterialIcons name="touch-app" size={40} color="#0066cc" />,
      route: '/NewLesson/Video/InteractiveIllustrations',
      image: require('../../../../assets/images/interactive-illustration-placeholder.png'),
    },
    {
      id: 'short-story-clips',
      title: '🎞 Short Story Clips',
      description: 'English short stories and everyday conversations with bilingual subtitles.',
      icon: <FontAwesome5 name="film" size={40} color="#0066cc" />,
      route: '/NewLesson/Video/ShortStoryClips',
      image: require('../../../../assets/images/short-story-placeholder.png'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Video & Illustrations</Text>
      <Text style={styles.subheader}>
        Learn English through visual and interactive content
      </Text>

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.card}
          onPress={() => router.push(category.route)}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>{category.icon}</View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              <Text style={styles.cardDescription}>{category.description}</Text>
            </View>
          </View>
          <Image source={category.image} style={styles.cardImage} />
          <View style={styles.cardFooter}>
            <Text style={styles.exploreText}>Explore</Text>
            <Ionicons name="arrow-forward" size={20} color="#0066cc" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12,
  },
  exploreText: {
    color: '#0066cc',
    fontWeight: 'bold',
    marginRight: 4,
  },
});

export default VideoIllustrationsHome; 