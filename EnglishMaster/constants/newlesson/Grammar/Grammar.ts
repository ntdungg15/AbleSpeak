import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        padding: 20,
        backgroundColor: '#FFFFFF',
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
    rulesList: {
        padding: 16,
    },
    ruleCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ruleTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E9F2',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E3A59',
    },
    modalContent: {
        padding: 16,
    },
    explanationTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
        marginBottom: 8,
    },
    explanation: {
        fontSize: 16,
        color: '#2E3A59',
        lineHeight: 24,
        marginBottom: 20,
    },
    examplesTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
        marginBottom: 8,
    },
    example: {
        fontSize: 16,
        color: '#2E3A59',
        marginBottom: 8,
        paddingLeft: 8,
    },
    practiceButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    practiceButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    exerciseContainer: {
        padding: 16,
    },
    exerciseQuestion: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    optionText: {
        fontSize: 16,
        color: '#2E3A59',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
        textAlign: 'center',
        marginTop: 20,
    },
});