import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    Extrapolate,
    withDelay
} from 'react-native-reanimated';
import YoutubePlayer from 'react-native-youtube-iframe';

type VideoCategory = 'storytelling' | 'grammar' | 'mistakes';

interface VideoItem {
    id: string;
    title: string;
    description: string;
    category: VideoCategory;
    videoId: string;
    duration: string;
    vocabulary: Array<{ word: string; definition: string }>;
}


const IllustrationVideos: React.FC = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('storytelling');
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
        opacity.value = withTiming(0.8);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
        opacity.value = withTiming(1);
    };

    const videos: VideoItem[] = [
        {
            id: 'story1',
            title: 'A Day at the Beach',
            description: 'Learn common phrases related to beach activities and weather.',
            category: 'storytelling',
            //   thumbnailUrl: require('../../../../assets/images/beach-thumbnail.png'),
            videoId: 'https://www.google.com/search?sca_esv=2848611885b4dcac&rlz=1C1GCEU_viVN1161VN1161&sxsrf=AHTn8zrTkDijyU07sJmjE_Rb1te_QX9DWQ:1746879427593&q=A+Day+at+the+Beach&udm=7&fbs=ABzOT_AfCikcO6SgGMxZXxAG9tmSB0ivEfrkZ2bhGvfAzfZcBPFQXafK35I07oyiMbr5AAlHL_h3YRlaB3oZ9wR8O-dI2T7lpiK9uCemCiEK-RltAwdgI1Y7hghVwQy-w3HjlUdTUDYnkms9r0VC6bVjx9sZQXAHoCLNaA2_Bzd3oQ6zLKdeilcWU5zcHcRKjfcLp4PMAmjTdfzG3zFny6B2x2uGvRAVpBNcMviqgkvH6vqUNJ_LIcE085I7ajuob_caNMu6DDkp&sa=X&sqi=2&ved=2ahUKEwid7_z98JiNAxXuk68BHeUsMzgQtKgLegQIIBAB&biw=1509&bih=944&dpr=1#fpstate=ive&vld=cid:987aedc4,vid:Fss6z5l1va8,st:0',
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
            //   thumbnailUrl: require('../../../../assets/images/restaurant-thumbnail.png'),
            videoId: 'https://example.com/videos/restaurant.mp4',
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
            //   thumbnailUrl: require('../../../../assets/images/grammar-thumbnail.png'),
            videoId: 'https://example.com/videos/present-perfect.mp4',
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
            //   thumbnailUrl: require('../../../../assets/images/conditionals-thumbnail.png'),
            videoId: 'https://example.com/videos/conditionals.mp4',
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
            //   thumbnailUrl: require('../../../../assets/images/pronunciation-thumbnail.png'),
            videoId: 'https://example.com/videos/pronunciation.mp4',
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
            //   thumbnailUrl: require('../../../../assets/images/prepositions-thumbnail.png'),
            videoId: 'https://example.com/videos/prepositions.mp4',
            duration: '3:20',
            vocabulary: [
                { word: 'in time', definition: 'Not late; with enough time to spare' },
                { word: 'on time', definition: 'At the scheduled time; punctual' },
                { word: 'by the time', definition: 'No later than; before or when' },
            ],
        },
    ];

    const filteredVideos = videos.filter((video) => video.category === selectedCategory);

    const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => (
        <Animated.View
            style={[
                styles.videoCard,
                {
                    transform: [{ translateY: index * 20 }],
                    opacity: 1
                }
            ]}
        >
            <YoutubePlayer
                height={200}
                play={false}
                videoId={item.videoId}
                onChangeState={state => console.log('player state', state)}
            />
            <Animated.View style={[styles.thumbnailContainer, animatedStyle]}>
                <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                <View style={styles.playButton}>
                    <MaterialIcons name="play-circle-filled" size={50} color="white" />
                </View>
            </Animated.View>
            <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Text style={styles.videoDescription} numberOfLines={2}>{item.description}</Text>
            </View>

        </Animated.View>
    );

    const renderCategoryTab = (category: VideoCategory, label: string) => {
        const isSelected = selectedCategory === category;
        const scale = useSharedValue(1);

        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ scale: scale.value }]
            };
        });

        return (
            <TouchableOpacity
                style={[
                    styles.categoryTab,
                    isSelected && styles.selectedCategoryTab
                ]}
                onPress={() => {
                    scale.value = withSpring(0.95, {}, () => {
                        scale.value = withSpring(1);
                    });
                    setSelectedCategory(category);
                }}
            >
                <Animated.Text style={[
                    styles.categoryText,
                    isSelected && styles.selectedCategoryText,
                    animatedStyle
                ]}>
                    {label}
                </Animated.Text>
            </TouchableOpacity>
        );
    };
    const headerTranslateY = useSharedValue(-20);
    const headerOpacity = useSharedValue(0);

    useEffect(() => {
        // Khi component mount, chạy animation
        headerTranslateY.value = withSpring(0);
        headerOpacity.value = withTiming(1, { duration: 500 });
    }, []);
    const headerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: headerTranslateY.value }],
        opacity: headerOpacity.value,
    }));


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
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.videoList}
                showsVerticalScrollIndicator={false}
            />

            <WebView
                source={{ uri: 'https://www.youtube.com/embed/ID_VIDEO' }}
                style={{ height: 200 }}
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
    categoryTabs: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        padding: 4,
    },
    categoryTab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    selectedCategoryTab: {
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#666',
    },
    selectedCategoryText: {
        color: '#0066cc',
        fontWeight: 'bold',
    },
    videoList: {
        paddingBottom: 20,
    },
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
    videoInfo: {
        padding: 12,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    videoDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default IllustrationVideos; 