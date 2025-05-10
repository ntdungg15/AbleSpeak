import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ViewToken,
} from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type VideoCategory = 'storytelling' | 'grammar' | 'mistakes';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  videoUrl: string;
  duration: string;
  vocabulary: Array<{ word: string; definition: string }>;
}

    const videos: VideoItem[] = [
        {
            id: 'story1',
            title: 'A Day at the Beach',
            description: 'Learn common phrases related to beach activities and weather.',
            category: 'storytelling',
            videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1746892110/A_Day_at_the_Beach_olg9f7.mp4',
            duration: '2:45',
            vocabulary: [
                { word: 'sunbathe', definition: 'to sit or lie in the sun to get a tan' },
                { word: 'shore', definition: 'the land along the edge of a sea or ocean' },
                { word: 'tide', definition: 'the regular rise and fall of the sea' },
            ],
        },
        {
            id: 'story2',
            title: 'At the Restaurant',
            description: 'Learn how to order food and have conversations at restaurants.',
            category: 'storytelling',
            videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1746894881/At_the_Restaurant_wbjrvh.mp4',
            duration: '3:12',
            vocabulary: [
                { word: 'menu', definition: 'a list of food and drinks available in a restaurant' },
                { word: 'bill', definition: 'a document showing how much you have to pay' },
                { word: 'waiter', definition: 'a person who serves food and drinks in a restaurant' },
            ],
        },
        {
            id: 'grammar1',
            title: 'Present Perfect vs. Past Simple',
            description: 'Understand when to use Present Perfect and Past Simple tenses.',
            category: 'grammar',
            videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1746895172/Present_Perfect_vs._Past_Simple_u0jna1.mp4',
            duration: '4:10',
            vocabulary: [
                { word: 'Present Perfect', definition: 'A tense used to describe actions that happened at an unspecified time in the past' },
                { word: 'Past Simple', definition: 'A tense used to describe actions that were completed in the past' },
                { word: 'already', definition: 'An adverb used with Present Perfect to indicate something happened before now' },
            ],
        },
        {
            id: 'grammar2',
            title: 'Conditional Sentences',
            description: 'Learn how to form and use different types of conditional sentences.',
            category: 'grammar',
            videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1746896512/Conditional_Sentences_yuaeao.mp4',
            duration: '3:55',
            vocabulary: [
                { word: 'First Conditional', definition: 'Used for possible situations in the future' },
                { word: 'Second Conditional', definition: 'Used for hypothetical or unlikely situations' },
                { word: 'Third Conditional', definition: 'Used for situations in the past that did not happen' },
            ],
        },
        {
            id: 'mistake1',
            title: 'Common Pronunciation Mistakes',
            description: 'Avoid these common pronunciation errors made by English learners.',
            category: 'mistakes',
            videoUrl: 'https://res.cloudinary.com/dtz1pxv22/video/upload/v1746896519/Common_Pronunciation_Mistakes_qateju.mp4',
            duration: '2:30',
            vocabulary: [
                { word: 'thought', definition: 'Past tense of think - often mispronounced' },
                { word: 'comfortable', definition: 'Providing physical comfort - note the syllable stress' },
                { word: 'vegetable', definition: 'Plant used for food - commonly mispronounced' },
            ],
        },
        {
            id: 'mistake2',
            title: 'Preposition Errors',
            description: 'Learn how to use prepositions correctly in English.',
            category: 'mistakes',
            videoUrl: 'https://example.com/videos/mistake2.mp4',
            duration: '3:20',
            vocabulary: [
                { word: 'in time', definition: 'Not late; with enough time to spare' },
                { word: 'on time', definition: 'At the scheduled time; punctual' },
                { word: 'by the time', definition: 'No later than; before or when' },
            ],
        },
    ];

    const VideoCard = React.memo(({ item, index, isActive }: { item: VideoItem; index: number; isActive: boolean }) => {
      const videoRef = useRef<Video>(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const [loading, setLoading] = useState(true);

      const handlePlayPause = async () => {
        if (isPlaying) {
          await videoRef.current?.pauseAsync();
          setIsPlaying(false);
        } else {
          await videoRef.current?.playAsync();
          setIsPlaying(true);
        }
      };

      const handleFullscreen = () => {
        videoRef.current?.presentFullscreenPlayer();
      };

      const handleVideoPress = async () => {
        if (isPlaying) {
          await videoRef.current?.pauseAsync();
          setIsPlaying(false);
        }
      };

      return (
        <Animated.View style={[styles.videoCard, { transform: [{ translateY: index * 20 }], opacity: 1 }]}>
          <View style={styles.videoContainer}>
            {loading && (
              <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                <Text style={{ color: '#fff' }}>Loading...</Text>
              </View>
            )}
            <TouchableOpacity
              activeOpacity={1}
              style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 2 }}
              onPress={handleVideoPress}
            >
              <Video
                ref={videoRef}
                source={{ uri: item.videoUrl }}
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay={isPlaying}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                onError={e => setLoading(false)}
              />
              {!isPlaying && !loading && (
                <TouchableOpacity
                  onPress={handlePlayPause}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -30 }, { translateY: -30 }],
                    zIndex: 3,
                  }}
                >
                  <MaterialIcons name="play-circle-filled" size={60} color="white" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFullscreen}
              style={{ position: 'absolute', bottom: 8, left: 8, backgroundColor: '#0008', padding: 6, borderRadius: 4, zIndex: 4 }}
            >
              <MaterialIcons name="fullscreen" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </Animated.View>
      );
    });
      
      const IllustrationVideos: React.FC = () => {
        const router = useRouter();
        const [selectedCategory, setSelectedCategory] =
          useState<VideoCategory>('storytelling');
      
        const headerTranslateY = useSharedValue(-20);
        const headerOpacity = useSharedValue(0);
        const headerStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: headerTranslateY.value }],
          opacity: headerOpacity.value,
        }));
      
        useEffect(() => {
          headerTranslateY.value = withSpring(0);
          headerOpacity.value = withTiming(1, { duration: 500 });
        }, []);
      
        useEffect(() => {
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });
        }, []);
      
        const filteredVideos = videos.filter(
          (v) => v.category === selectedCategory
        );
      
        const renderCategoryTab = (category: VideoCategory, label: string) => {
          const isSelected = selectedCategory === category;
          const scale = useSharedValue(1);
          const tabStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }));
      
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                isSelected && styles.selectedCategoryTab,
              ]}
              onPress={() => {
                scale.value = withSpring(0.95, {}, () => {
                  scale.value = withSpring(1);
                });
                setSelectedCategory(category);
              }}
            >
              <Animated.Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                  tabStyle,
                ]}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        };
      
        const [activeIndex, setActiveIndex] = useState(0);

        const onViewableItemsChanged = useRef(
          ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
            if (viewableItems.length > 0 && viewableItems[0].index !== null) {
              setActiveIndex(viewableItems[0].index!);
            }
          }
        ).current;
      
        return (
          <View style={styles.container}>
            <Animated.Text style={[styles.header, headerStyle]}>
              🎬 Illustration Videos
            </Animated.Text>
      
            <View style={styles.categoryTabs}>
              {renderCategoryTab('storytelling', 'Visual Storytelling')}
              {renderCategoryTab('grammar', 'Grammar Animations')}
              {renderCategoryTab('mistakes', 'Common Mistakes')}
            </View>
      
            <FlatList
              data={filteredVideos}
              renderItem={({ item, index }) => (
                <VideoCard item={item} index={index} isActive={index === activeIndex} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.videoList}
              showsVerticalScrollIndicator={false}
              windowSize={3}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
            />
          </View>
        );
      };
      
      const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
        header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#333' },
        categoryTabs: {
          flexDirection: 'row',
          marginBottom: 20,
          backgroundColor: '#e9ecef',
          borderRadius: 8,
          padding: 4,
        },
        categoryTab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
        selectedCategoryTab: {
          backgroundColor: 'white',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        categoryText: { fontSize: 12, fontWeight: '500', color: '#666' },
        selectedCategoryText: { color: '#0066cc', fontWeight: 'bold' },
        videoList: { paddingBottom: 20 },
        videoCard: {
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
        videoContainer: { position: 'relative', width: '100%', height: 200, backgroundColor: '#000' },
        video: { width: '100%', height: '100%' },
        durationBadge: {
          position: 'absolute',
          bottom: 8, right: 8,
          backgroundColor: 'rgba(0,0,0,0.7)',
          paddingHorizontal: 8, paddingVertical: 4,
          borderRadius: 4,
        },
        durationText: { color: 'white', fontSize: 12, fontWeight: '500' },
        videoInfo: { padding: 12 },
        videoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#333' },
        videoDescription: { fontSize: 14, color: '#666', lineHeight: 20 },
      });
      
      export default IllustrationVideos;