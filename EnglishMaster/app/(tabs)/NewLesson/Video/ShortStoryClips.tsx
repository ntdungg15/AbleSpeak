import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Types
type StoryType = 'stories' | 'conversations';

interface StoryItem {
  id: string;
  title: string;
  description: string;
  type: StoryType;
  videoUrl: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  hasSubtitles: boolean;
  vocabulary: Array<{ word: string; definition: string; example: string }>;
}

const ShortStoryClips: React.FC = () => {
  const router = useRouter();
  const [activeType, setActiveType] = useState<StoryType>('stories');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Global interaction animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Header animation
  const headerScale = useSharedValue(0.8);
  const headerOpacity = useSharedValue(0);
  useEffect(() => {
    headerScale.value = withSpring(1);
    headerOpacity.value = withTiming(1, { duration: 500 });
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
    opacity: headerOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  const stories: StoryItem[] = [
    {
      id: 'story1',
      title: 'The Lost Key',
      description: 'A short story about a man who lost his keys and the journey to find them.',
      type: 'stories',
    //   thumbnailUrl: require('../../../../assets/images/lost-key.png'),
      videoUrl: 'https://example.com/videos/lost-key.mp4',
      duration: '4:30',
      level: 'beginner',
      hasSubtitles: true,
      vocabulary: [
        { 
          word: 'misplace', 
          definition: 'to put something in the wrong place and be unable to find it', 
          example: 'I misplaced my keys and couldn\'t find them anywhere.' 
        },
        { 
          word: 'search', 
          definition: 'to look carefully for something', 
          example: 'He searched the entire house for his lost wallet.' 
        },
        { 
          word: 'retrace', 
          definition: 'to go back over the same route or steps', 
          example: 'I had to retrace my steps to find where I dropped my phone.' 
        },
      ],
    },
    {
      id: 'story2',
      title: 'The Unexpected Gift',
      description: 'A heartwarming story about receiving an unexpected present from a stranger.',
      type: 'stories',
    //   thumbnailUrl: require('../../../../assets/images/unexpected-gift.png'),
      videoUrl: 'https://example.com/videos/unexpected-gift.mp4',
      duration: '5:15',
      level: 'intermediate',
      hasSubtitles: true,
      vocabulary: [
        { 
          word: 'unexpected', 
          definition: 'not anticipated or predicted', 
          example: 'His visit was completely unexpected.' 
        },
        { 
          word: 'generous', 
          definition: 'showing a readiness to give more of something than is necessary or expected', 
          example: 'She was generous with her time and always helped others.' 
        },
        { 
          word: 'grateful', 
          definition: 'feeling or showing appreciation for something done or received', 
          example: 'I am grateful for your help during this difficult time.' 
        },
      ],
    },
    {
      id: 'conv1',
      title: 'At the Coffee Shop',
      description: 'Learn how to order coffee and have casual conversations at a café.',
      type: 'conversations',
    //   thumbnailUrl: require('../../../../assets/images/coffee-shop.png'),
      videoUrl: 'https://example.com/videos/coffee-shop.mp4',
      duration: '3:45',
      level: 'beginner',
      hasSubtitles: true,
      vocabulary: [
        { 
          word: 'order', 
          definition: 'to request food or drinks in a restaurant or café', 
          example: 'I would like to order a cappuccino, please.' 
        },
        { 
          word: 'menu', 
          definition: 'a list of food and drinks available in a restaurant', 
          example: 'Can I see the menu, please?' 
        },
        { 
          word: 'receipt', 
          definition: 'a printed document showing that money has been paid', 
          example: 'Could I have a receipt for my purchase?' 
        },
      ],
    },
    {
      id: 'conv2',
      title: 'Job Interview',
      description: 'Learn professional vocabulary and phrases used in job interviews.',
      type: 'conversations',
    //   thumbnailUrl: require('../../../../assets/images/job-interview.png'),
      videoUrl: 'https://example.com/videos/job-interview.mp4',
      duration: '6:20',
      level: 'advanced',
      hasSubtitles: true,
      vocabulary: [
        { 
          word: 'qualification', 
          definition: 'an official record showing that you have finished a training course or have the necessary skills', 
          example: 'I have several qualifications in marketing and digital media.' 
        },
        { 
          word: 'experience', 
          definition: 'the knowledge or skill that you gain from doing a job or activity', 
          example: 'I have five years of experience in customer service.' 
        },
        { 
          word: 'strength', 
          definition: 'a good quality or ability that makes someone effective', 
          example: 'My greatest strength is my ability to work well under pressure.' 
        },
      ],
    },
  ];

  const filteredStories = stories.filter(
    (story) =>
      story.type === activeType &&
      (selectedLevel === null || story.level === selectedLevel)
  );

  const levelOptions = [
    { id: 'beginner', label: 'Beginner', color: '#4CAF50' },
    { id: 'intermediate', label: 'Intermediate', color: '#FF9800' },
    { id: 'advanced', label: 'Advanced', color: '#F44336' },
  ];

  const toggleLevel = (level: string) => {
    setSelectedLevel(prev => (prev === level ? null : level));
  };

  const renderStoryItem = ({ item, index }: { item: StoryItem; index: number }) => (
    <Animated.View
      style={[
        styles.storyCard,
        { transform: [{ translateY: index * 20 }] },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        style={styles.storyCard}
        onPress={() =>
          router.push({
            pathname: '/NewLesson/Video/VideoPlayer',
            params: {
              id: item.id,
              title: item.title,
              videoUrl: item.videoUrl,
              description: item.description,
              vocabulary: JSON.stringify(item.vocabulary),
            },
          })
        }
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.thumbnailContainer}>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>

          <View style={styles.playButton}>
            <MaterialIcons name="play-circle-filled" size={50} color="white" />
          </View>

          <View
            style={[
              styles.levelBadge,
              { backgroundColor: levelOptions.find(l => l.id === item.level)?.color },
            ]}
          >
            <Text style={styles.levelText}>
              {levelOptions.find(l => l.id === item.level)?.label}
            </Text>
          </View>

          {item.hasSubtitles && (
            <View style={styles.subtitlesBadge}>
              <MaterialIcons name="closed-caption" size={12} color="white" />
              <Text style={styles.subtitlesText}>EN/VI</Text>
            </View>
          )}
        </View>

        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle}>{item.title}</Text>
          <Text style={styles.storyDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.header, headerAnimatedStyle]}>
        🎞 Short Story Clips
      </Animated.Text>

      {/* Type Tabs and Filters ... unchanged ... */}

      <FlatList
        data={filteredStories}
        renderItem={renderStoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.storiesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="videocam-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No stories found</Text>
            <Text style={styles.emptySubtext}>Try changing your filters</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  typeTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTypeTab: {
    borderBottomColor: '#0066cc',
  },
  typeTabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTypeTabText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  levelFilters: {
    flexDirection: 'row',
  },
  levelFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  levelFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedLevelText: {
    fontWeight: 'bold',
  },
  storiesList: {
    paddingBottom: 20,
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 180,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  levelBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  subtitlesBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitlesText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 4,
  },
  storyInfo: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  storyDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default ShortStoryClips; 