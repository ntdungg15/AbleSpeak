import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExaminationProgressProps {
  current: number;
  total: number;
}

export const ExaminationProgress = ({ current, total }: ExaminationProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.text}>
        Câu {current}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3498db',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
}); 