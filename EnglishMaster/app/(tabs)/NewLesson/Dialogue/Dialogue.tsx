import React, { useState } from 'react';
import {
    View, Text, SafeAreaView,
    FlatList, StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView, TextInput, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/constants/newlesson/Dialogue/Dialogue';
const dialogueData = [
    {
        id: '1',
        character: 'Sarah',
        text: 'Hello! How are you today?',
        audio: 'audio1.mp3',
        translation: 'Xin chào! Hôm nay bạn thế nào?'
    },
    {
        id: '2',
        character: 'John',
        text: 'I am doing great, thank you! And you?',
        audio: 'audio2.mp3',
        translation: 'Tôi rất khỏe, cảm ơn bạn! Còn bạn thì sao?'
    },
    {
        id: '3',
        character: 'Sarah',
        text: 'I am fine too. Would you like to grab a coffee?',
        audio: 'audio3.mp3',
        translation: 'Tôi cũng khỏe. Bạn có muốn đi uống cà phê không?'
    }
];

const Dialogue = () => {
    const [message, setMessage] = useState('');

    const renderItem = ({ item }) => (
        <View style={[
            styles.dialogueItem,
            item.character === 'Sarah' ? styles.leftDialogue : styles.rightDialogue
        ]}>
            <View style={styles.dialogueHeader}>
                <Text style={styles.character}>{item.character}</Text>
                <TouchableOpacity style={styles.audioButton}>
                    <Ionicons name="play-circle-outline" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.dialogueContent}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.translation}>{item.translation}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Basic Conversation</Text>
                <Text style={styles.subtitle}>Learn daily conversations in English</Text>
            </View>



            {/* KeyboardAvoidingView */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <FlatList
                    data={dialogueData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />



                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="mic-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />

                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="image-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.sendButton, !message && styles.sendButtonDisabled]}
                        disabled={!message}
                    >
                        <Ionicons
                            name="send"
                            size={24}
                            color={message ? "#007AFF" : "#B4B4B4"}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



export default Dialogue;