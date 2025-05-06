// Grammar.tsx
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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

interface ExerciseResult {
    question: string;
    selectedIndex: number;
    correctIndex: number;
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
    const [showResults, setShowResults] = useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState<ExerciseResult[]>([]);
    const [showAnimation, setShowAnimation] = useState(true);

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
        if (!selectedRule) return;
        const correctIndex = selectedRule.exercises[currentExerciseIndex].correctAnswer;
        // record result
        setResults(prev => [...prev, {
            question: selectedRule.exercises[currentExerciseIndex].question,
            selectedIndex: answerIndex,
            correctIndex
        }]);
        // update score
        if (answerIndex === correctIndex) {
            setScore(prev => prev + 1);
        }
        // move next or finish
        const lastIndex = selectedRule.exercises.length - 1;
        if (currentExerciseIndex < lastIndex) {
            setCurrentExerciseIndex(prev => prev + 1);
        } else {
            // show results
            setShowExercise(false);
            setShowResults(true);
        }
    };

    const handleStartExercise = () => {
        setScore(0);
        setResults([]);
        setCurrentExerciseIndex(0);
        setShowResults(false);
        setShowExercise(true);
    };

    const handleCloseResults = () => {
        setSelectedRule(null);
        setShowResults(false);
        setScore(0);
        setResults([]);
    };

    useFocusEffect(
        React.useCallback(() => {
            setShowAnimation(true); // Hiển thị animation
            const timer = setTimeout(() => setShowAnimation(false), 600); // Tắt animation sau 600ms
            return () => clearTimeout(timer); // Dọn dẹp timer khi rời khỏi trang
        }, [])
    );

    const renderRuleCard = (rule: GrammarRule) => (
        <Animatable.View
            key={rule.id}
            animation={showAnimation ? "fadeInUp" : undefined} // Chỉ chạy animation nếu showAnimation = true
            duration={500}
            style={styles.ruleCard}
        >
            <TouchableOpacity onPress={() => setSelectedRule(rule)} style={styles.ruleTouch}>
                <Animatable.Text animation={showAnimation ? "fadeIn" : undefined} delay={300} style={styles.ruleTitle}>
                    {rule.title}
                </Animatable.Text>
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
                <Animatable.View
                    animation={showAnimation ? "fadeInDown" : undefined}
                    duration={600}
                    style={styles.header}
                >
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
                    setShowResults(false);
                    setScore(0);
                    setResults([]);
                }}
            >
                <Animatable.View animation="slideInUp" duration={500} style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setSelectedRule(null)}>
                            <Ionicons name="close" size={28} color="#007AFF" />
                        </TouchableOpacity>
                        <Animatable.Text animation="fadeIn" style={styles.modalTitle}>{selectedRule?.title}</Animatable.Text>
                        <View style={{ width: 28 }} />
                    </View>

                    {!showResults && !showExercise && (
                        <ScrollView style={styles.modalContent}>
                            {/* Explanation Section */}
                            <Animatable.View animation="fadeIn" delay={200} style={styles.sectionBox}>
                                <Text style={styles.examplesTitle}>Explanation</Text>
                                <Text style={styles.explanation}>{selectedRule?.explanation}</Text>
                            </Animatable.View>

                            {/* Formula Section */}
                            <Animatable.View animation="fadeIn" delay={300} style={styles.sectionBox}>
                                <Text style={styles.subsectionTitle}>Formula</Text>
                                <Text style={styles.subsectionText}>• Positive: {selectedRule?.formula.positive}</Text>
                                <Text style={styles.subsectionText}>• Negative: {selectedRule?.formula.negative}</Text>
                                <Text style={styles.subsectionText}>• Question: {selectedRule?.formula.question}</Text>
                            </Animatable.View>

                            {/* Grammar Section */}
                            <Animatable.View animation="fadeIn" delay={400} style={styles.sectionBox}>
                                <Text style={styles.subsectionTitle}>Grammar</Text>
                                <Text style={styles.subsectionText}>{selectedRule?.grammar}</Text>
                            </Animatable.View>

                            {/* Examples Section */}
                            <Animatable.View animation="fadeIn" delay={500} style={styles.sectionBox}>
                                <Text style={styles.examplesTitle}>Examples</Text>
                                {selectedRule?.examples.map((example, index) => (
                                    <Text key={index} style={styles.example}>• {example}</Text>
                                ))}
                            </Animatable.View>

                            {/* Practice Button */}
                            <TouchableOpacity onPress={handleStartExercise} style={styles.practiceWrap}>
                                <Animatable.View animation="pulse" iterationCount="infinite" delay={600} style={styles.practiceButton}>
                                    <Text style={styles.practiceButtonText}>Practice Now</Text>
                                </Animatable.View>
                            </TouchableOpacity>
                        </ScrollView>

                    )}

                    {showExercise && !showResults && (
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
                        </View>
                    )}

                    {showResults && (
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.subsectionTitle}>Your Results</Text>
                            <Text style={styles.scoreText}>Score: {score} / {results.length}</Text>
                            {results.map((res, idx) => (
                                <View key={idx} style={styles.resultItem}>
                                    <Text style={styles.exerciseQuestion}>{res.question}</Text>
                                    <Text style={res.selectedIndex === res.correctIndex ? styles.correctText : styles.wrongText}>
                                        Your answer: {selectedRule?.exercises[idx].options[res.selectedIndex]}
                                    </Text>
                                    {res.selectedIndex !== res.correctIndex && (
                                        <Text style={styles.correctText}>
                                            Correct answer: {selectedRule?.exercises[idx].options[res.correctIndex]}
                                        </Text>
                                    )}
                                </View>
                            ))}
                            <TouchableOpacity onPress={handleCloseResults} style={[styles.practiceButton, { marginTop: 20 }]}>
                                <Text style={styles.practiceButtonText}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </Animatable.View>
            </Modal>
        </SafeAreaView>
    );
};

export default Grammar;
