import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/constants/newlesson/Grammar/Grammar';

interface GrammarRule {
    id: string;
    title: string;
    explanation: string;
    examples: string[];
    exercises: {
        question: string;
        options: string[];
        correctAnswer: number;
    }[];
}

const grammarData: GrammarRule[] = [
    {
        id: '1',
        title: 'Present Simple Tense',
        explanation: 'Used for habits, repeated actions, permanent situations, and general truths.',
        examples: [
            'I play tennis every Sunday.',
            'The sun rises in the east.',
            'She works in a bank.'
        ],
        exercises: [
            {
                question: 'He ____ (work) in a hospital.',
                options: ['work', 'works', 'working', 'worked'],
                correctAnswer: 1
            },
            {
                question: 'They ____ (study) English every day.',
                options: ['studies', 'study', 'studying', 'studied'],
                correctAnswer: 1
            }
        ]
    },
];

const Grammar = () => {
    const [selectedRule, setSelectedRule] = useState<GrammarRule | null>(null);
    const [showExercise, setShowExercise] = useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (answerIndex: number) => {
        if (selectedRule && selectedRule.exercises[currentExerciseIndex].correctAnswer === answerIndex) {
            setScore(score + 1);
        }
        if (currentExerciseIndex < selectedRule!.exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
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
        <TouchableOpacity
            key={rule.id}
            style={styles.ruleCard}
            onPress={() => setSelectedRule(rule)}
        >
            <Text style={styles.ruleTitle}>{rule.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Grammar Rules</Text>
                    <Text style={styles.headerSubtitle}>Master English Grammar</Text>
                </View>

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
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setSelectedRule(null)}>
                            <Ionicons name="close" size={28} color="#007AFF" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedRule?.title}</Text>
                        <View style={{ width: 28 }} />
                    </View>

                    {!showExercise ? (
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.explanationTitle}>Explanation</Text>
                            <Text style={styles.explanation}>{selectedRule?.explanation}</Text>

                            <Text style={styles.examplesTitle}>Examples</Text>
                            {selectedRule?.examples.map((example, index) => (
                                <Text key={index} style={styles.example}>• {example}</Text>
                            ))}

                            <TouchableOpacity
                                style={styles.practiceButton}
                                onPress={handleStartExercise} 
                            >
                                <Text style={styles.practiceButtonText}>Practice Now</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    ) : (
                        <View style={styles.exerciseContainer}>
                            <Text style={styles.exerciseQuestion}>
                                {selectedRule?.exercises[currentExerciseIndex].question}
                            </Text>
                            {selectedRule?.exercises[currentExerciseIndex].options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handleAnswer(index)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                            <Text style={styles.scoreText}>Score: {score}</Text>
                        </View>
                    )}
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};



export default Grammar;