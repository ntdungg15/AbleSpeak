import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#007BFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  searchIconButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  searchResultsContainer: {
    padding: 16,
  },
  searchResultItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  phoneticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneticText: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  audioButton: {
    fontSize: 20,
    color: '#007BFF',
  },
  meaningContainer: {
    marginTop: 8,
  },
  partOfSpeech: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666666',
    marginBottom: 4,
  },
  definition: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 16,
    marginBottom: 4,
  },
  lessonsContainer: {
    padding: 16,
  },
  lessonContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  lessonContent: {
    flex: 1,
    padding: 12,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  downloadButton: {
    padding: 12,
    justifyContent: 'center',
  },
  downloadIcon: {
    fontSize: 20,
  },

  translationToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  translationToggleButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  translationActive: {
    backgroundColor: '#4CAF50',
  },
  translationInactive: {
    backgroundColor: '#9E9E9E',
  },
  translationToggleText: {
    color: 'white',
    fontWeight: '600',
  },
  definitionContainer: {
    marginBottom: 8,
  },
  translationText: {
    fontStyle: 'italic',
    color: '#0D47A1',
    marginLeft: 15,
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#757575',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});