import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E9F2',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E3A59',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#8F9BB3',
        marginTop: 4,
    },
    contentList: {
        padding: 16,
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnailContainer: {
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
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
        color: '#FFFFFF',
        fontSize: 12,
    },
    cardContent: {
        padding: 16,
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
        marginBottom: 8,
    },
    contentDescription: {
        fontSize: 14,
        color: '#8F9BB3',
    },
    selectedContentContainer: {
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#007AFF',
    },
    video: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    fullImage: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    contentDetails: {
        padding: 16,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E3A59',
        marginBottom: 8,
    },
    detailDescription: {
        fontSize: 16,
        color: '#2E3A59',
        lineHeight: 24,
    },
});