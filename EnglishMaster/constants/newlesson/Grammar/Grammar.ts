import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },

  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },

  rulesList: {
    padding: 16,
  },
  ruleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    // gradient-like shadow
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDD',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A90E2',
  },

  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Section titles
  explanationTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    color: '#4A90E2',
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#555',
  },

  subsectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 2,
    color: '#4A90E2',
  },
  subsectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 6,
    color: '#555',
  },

  examplesTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 2,
    color: '#4A90E2',
  },
  example: {
    fontSize: 16,
    marginVertical: 4,
    marginLeft: 12,
    color: '#555',
  },

  practiceButton: {
    marginVertical: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    alignSelf: 'center',
  },
  practiceButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Exercise
  exerciseContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  exerciseProgress: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    textAlign: 'center',
  },
  exerciseQuestion: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#FFF',
  },
  optionText: {
    fontSize: 16,
    color: '#4A90E2',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    textAlign: 'center',
    color: '#4A90E2',
  },
  noteContainer: {
    backgroundColor: '#E8F4FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  ruleTouch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceWrap: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  resultItem: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  correctText: {
    color: '#4CAF50',        
    fontWeight: '600',
    marginTop: 4,
  },
  wrongText: {
    color: '#F44336',        
    fontWeight: '600',
    marginTop: 4,
  },
});