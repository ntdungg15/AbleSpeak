import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#4a86e8',
    },
    backButton: {
      padding: 8,
    },
    backIcon: {
      fontSize: 24,
      color: 'white',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      flex: 1,
      textAlign: 'center',
    },
    placeholder: {
      width: 40,
    },
    progressContainer: {
      padding: 16,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    progressText: {
      fontSize: 14,
      marginBottom: 8,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: '#e0e0e0',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#4caf50',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      padding: 16,
    },
    wordContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    wordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    word: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    learnedButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: '#e0e0e0',
    },
    learnedButtonActive: {
      backgroundColor: '#4caf50',
    },
    learnedButtonText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#333',
    },
    phoneticContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    phoneticText: {
      fontSize: 16,
      color: '#666',
      marginRight: 8,
    },
    audioButton: {
      fontSize: 20,
    },
    meaningContainer: {
      marginTop: 8,
    },
    partOfSpeech: {
      fontSize: 16,
      fontWeight: '500',
      fontStyle: 'italic',
      color: '#4a86e8',
      marginBottom: 8,
    },
    definitionContainer: {
      marginBottom: 8,
    },
    definition: {
      fontSize: 15,
      lineHeight: 22,
    },
    example: {
      fontSize: 14,
      fontStyle: 'italic',
      color: '#666',
      marginTop: 4,
      marginLeft: 12,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
    fabButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#4a86e8',
      borderRadius: 28,
      width: 120,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    },
    fabText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });