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
import { Image } from 'react-native';
import { styles } from '@/constants/newlesson/Video/stories';

type StoryType = 'stories' | 'conversations';

interface StoryItem {
  id: string;
  title: string;
  description: string;
  type: StoryType;
  thumbnailUrl: any;
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

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const headerScale = useSharedValue(0.8);
  const headerOpacity = useSharedValue(0);
  useEffect(() => {
    headerScale.value = withSpring(1);
    headerOpacity.value = withTiming(1, { duration: 500 });
  }, []);

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
      thumbnailUrl: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1747063607/lost_key_zsnc4v.jpg' },
      videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1747063620/The_Lost_Key_goh05v.mp4',
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
      thumbnailUrl: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1747063607/gift_qepyzr.jpg' },
      videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1747063621/The_Unexpected_Gift_lq7wgg.mp4',
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
      thumbnailUrl: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1747064983/At_the_Coffee_Shop_d1v8qp.jpg' },
      videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1747064986/job_interview_kip8sk.mp4',
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
      thumbnailUrl: { uri: 'https://res.cloudinary.com/dtz1pxv22/image/upload/v1747064984/Job_Interview_gmkjbs.jpg' },
      videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1747064986/job_interview_kip8sk.mp4',
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

          <Image
            source={item.thumbnailUrl}
            style={styles.thumbnail} 
          />

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

      <View style={styles.typeTabs}>
        <TouchableOpacity
          style={[styles.typeTab, activeType === 'stories' && styles.activeTypeTab]}
          onPress={() => setActiveType('stories')}
        >
          <Text style={[styles.typeTabText, activeType === 'stories' && styles.activeTypeTabText]}>
            Stories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeTab, activeType === 'conversations' && styles.activeTypeTab]}
          onPress={() => setActiveType('conversations')}
        >
          <Text style={[styles.typeTabText, activeType === 'conversations' && styles.activeTypeTabText]}>
            Conversations
          </Text>
        </TouchableOpacity>
      </View>
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



export default ShortStoryClips; 