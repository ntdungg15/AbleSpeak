import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from "expo-router";

const VideoIllustrationsHome: React.FC = () => {
  const router = useRouter();

  const categories = [
    {
      id: 'illustration-videos',
      title: '🎬 Illustration Videos',
      description: 'Learn English with engaging animation videos.',
      icon: <Ionicons name="videocam" size={40} color="#0066cc" />,
      route: '/NewLesson/Video/IllustrationVideos',
      image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746879285/istockphoto-1320675065-612x612_tskesz.jpg' },
    },
    {
      id: 'interactive-illustrations',
      title: '🖌 Interactive Illustrations',
      description: 'Build vocabulary with interactive pictures.',
      icon: <MaterialIcons name="touch-app" size={40} color="#0066cc" />,
      route: '/NewLesson/Video/InteractiveIllustrations',
      image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746881431/interactive-illustrations_sngm3h.jpg' },
    },
    {
      id: 'short-story-clips',
      title: '🎞 Short Story Clips',
      description: 'Watch short stories with bilingual subtitles.',
      icon: <FontAwesome5 name="film" size={40} color="#0066cc" />,
      route: '/NewLesson/Video/ShortStoryClips',
      image: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746881431/short-story-clips_mwneis.png' },
    },
  ];
  const img: { uri: string } = { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1746887720/footer_b7cbwx.jpg' };
  return (
    <SafeAreaView style={styles.container} >

      <ScrollView contentContainerStyle={styles.contentContainer}>

        <Text style={styles.header}>Video & Illustrations</Text>
        <Text style={styles.subheader}>
          Learn English through visual and interactive content
        </Text>

        <View style={styles.cardSeparator} >
          <Image source={img} style={styles.cardImageFooter} />
        </View>
        <View>
          {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() => router.push({ pathname: category.route as "/NewLesson/Video/IllustrationVideos" | "/NewLesson/Video/InteractiveIllustrations" | "/NewLesson/Video/ShortStoryClips" })}
          >
            <View style={styles.cardRow}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{category.title}</Text>
                <Text style={styles.cardDescription}>{category.description}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.exploreText}>Explore</Text>
                  <Ionicons name="arrow-forward" size={20} color="#0066cc" />
                </View>
              </View>
              <Image source={category.image} style={styles.cardImage} />
            </View>
          </TouchableOpacity>
        ))}
        </View>

      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 10,
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
    shadowRadius: 10,
    // overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 2,
    padding: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
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
    flex: 1.3,
    height: 120,
    resizeMode: 'cover',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginRight: 10,
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
  cardSeparator: {
    flex: 2,
    height: 230,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  cardImageFooter: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
    borderRadius: 12,
  },
});

export default VideoIllustrationsHome; 