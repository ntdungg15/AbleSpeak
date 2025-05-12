import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    typeTabs: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    typeTab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderBottomWidth: 2,
      borderBottomColor: '#e0e0e0',
    },
    activeTypeTab: {
      borderBottomColor: '#0066cc',
    },
    typeTabText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
      color: '#666',
    },
    activeTypeTabText: {
      color: '#0066cc',
      fontWeight: 'bold',
    },
    filtersContainer: {
      marginBottom: 16,
    },
    filterLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    levelFilters: {
      flexDirection: 'row',
    },
    levelFilter: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginRight: 8,
    },
    levelDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    levelFilterText: {
      fontSize: 12,
      fontWeight: '500',
    },
    selectedLevelText: {
      fontWeight: 'bold',
    },
    storiesList: {
      paddingBottom: 20,
    },
    storyCard: {
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
    levelBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    levelText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
    subtitlesBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    subtitlesText: {
      color: 'white',
      fontSize: 10,
      fontWeight: '500',
      marginLeft: 4,
    },
    storyInfo: {
      padding: 12,
    },
    storyTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#333',
    },
    storyDescription: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#666',
      marginTop: 16,
    },
    emptySubtext: {
      fontSize: 14,
      color: '#999',
      marginTop: 8,
    },
  });