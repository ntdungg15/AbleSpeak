// Grammar.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { fetchGrammarRules } from '@/api/NewLesson/grammar';
import { styles } from '@/constants/newlesson/Grammar/Grammar';

interface Formula {
    positive: string;
    negative: string;
    question: string;
}

interface GrammarRule {
    id: string;
    title: string;
    explanation: string;
    formula: Formula;
    grammar: string;
    examples: string[];
    exercises: {
        question: string;
        options: string[];
        correctAnswer: number;
    }[];
}

const Grammar = () => {
    const [grammarData, setGrammarData] = useState<GrammarRule[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRule, setSelectedRule] = useState<GrammarRule | null>(null);
    const [showExercise, setShowExercise] = useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const loadGrammarData = async () => {
            try {
                const data = await fetchGrammarRules();
                setGrammarData(data as GrammarRule[]);
            } catch (error) {
                console.error('Error fetching grammar data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadGrammarData();
    }, []);

    const handleAnswer = (answerIndex: number) => {
        if (selectedRule && selectedRule.exercises[currentExerciseIndex].correctAnswer === answerIndex) {
            setScore(prev => prev + 1);
        }
        if (selectedRule && currentExerciseIndex < selectedRule.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
        } else {
            setShowExercise(false);
            setCurrentExerciseIndex(0);
        }
    };

    const handleStartExercise = () => {
        setScore(0);
        setShowExercise(true);
        setCurrentExerciseIndex(0);
    };

    const renderRuleCard = (rule: GrammarRule) => (
        <Animatable.View
            key={rule.id}
            animation="fadeInUp"
            duration={500}
            style={styles.ruleCard}
        >
            <TouchableOpacity onPress={() => setSelectedRule(rule)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Animatable.Text animation="fadeIn" delay={300} style={styles.ruleTitle}>{rule.title}</Animatable.Text>
                <Ionicons name="chevron-forward" size={24} color="#007AFF" />
            </TouchableOpacity>
        </Animatable.View>
    );

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>  
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>Loading grammar rules...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={600} style={styles.header}>
                    <Text style={styles.headerTitle}>Grammar Rules</Text>
                    <Text style={styles.headerSubtitle}>Master English Grammar</Text>
                </Animatable.View>
                <View style={styles.rulesList}>
                    {grammarData.map(renderRuleCard)}
                </View>
            </ScrollView>

            <Modal
                visible={!!selectedRule}
                animationType="slide"
                onRequestClose={() => {
                    setSelectedRule(null);
                    setShowExercise(false);
                    setScore(0);
                }}
            >
                <Animatable.View animation="slideInUp" duration={500} style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setSelectedRule(null)}>
                            <Ionicons name="close" size={28} color="#007AFF" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedRule?.title}</Text>
                        <View style={{ width: 28 }} />
                    </View>

                    {!showExercise ? (
                        <ScrollView style={styles.modalContent}>
                            <Animatable.Text animation="fadeIn" delay={200} style={styles.explanationTitle}>Explanation</Animatable.Text>
                            <Animatable.Text animation="fadeIn" delay={300} style={styles.explanation}>{selectedRule?.explanation}</Animatable.Text>

                            <Animatable.Text animation="fadeIn" delay={400} style={styles.subsectionTitle}>Formula</Animatable.Text>
                            <Animatable.Text animation="fadeIn" delay={450} style={styles.subsectionText}>• Positive: {selectedRule?.formula.positive}</Animatable.Text>
                            <Animatable.Text animation="fadeIn" delay={500} style={styles.subsectionText}>• Negative: {selectedRule?.formula.negative}</Animatable.Text>
                            <Animatable.Text animation="fadeIn" delay={550} style={styles.subsectionText}>• Question: {selectedRule?.formula.question}</Animatable.Text>

                            <Animatable.Text animation="fadeIn" delay={600} style={styles.subsectionTitle}>Grammar</Animatable.Text>
                            <Animatable.Text animation="fadeIn" delay={650} style={styles.subsectionText}>{selectedRule?.grammar}</Animatable.Text>

                            <Animatable.Text animation="fadeIn" delay={700} style={styles.examplesTitle}>Examples</Animatable.Text>
                            {selectedRule?.examples.map((example, index) => (
                                <Animatable.Text key={index} animation="fadeIn" delay={750 + index * 50} style={styles.example}>• {example}</Animatable.Text>
                            ))}

                            <TouchableOpacity onPress={handleStartExercise}>
                                <Animatable.View animation="pulse" iterationCount="infinite" delay={800} style={styles.practiceButton}>
                                    <Text style={styles.practiceButtonText}>Practice Now</Text>
                                </Animatable.View>
                            </TouchableOpacity>
                        </ScrollView>
                    ) : (
                        <View style={styles.exerciseContainer}>
                            <Text style={styles.exerciseProgress}>Question {currentExerciseIndex + 1} of {selectedRule?.exercises.length}</Text>
                            <Animatable.Text animation="fadeIn" delay={200} style={styles.exerciseQuestion}>{selectedRule?.exercises[currentExerciseIndex].question}</Animatable.Text>
                            {selectedRule?.exercises[currentExerciseIndex].options.map((option, idx) => (
                                <Animatable.View key={idx} animation="fadeIn" delay={300 + idx * 100}>
                                    <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(idx)}>
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            ))}
                            <Animatable.Text animation="fadeIn" delay={600} style={styles.scoreText}>Score: {score}</Animatable.Text>
                        </View>
                    )}
                </Animatable.View>
            </Modal>
        </SafeAreaView>
    );
};

export default Grammar;
