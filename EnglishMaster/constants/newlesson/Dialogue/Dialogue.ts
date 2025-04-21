import {StyleSheet} from "react-native";


export  const styles = StyleSheet.create({
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
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E3A59',
        marginBottom: 4,
      },
      subtitle: {
        fontSize: 14,
        color: '#8F9BB3',
      },
      listContainer: {
        padding: 16,
      },
      dialogueItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        maxWidth: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      },
      leftDialogue: {
        alignSelf: 'flex-start',
        borderTopLeftRadius: 4,
      },
      rightDialogue: {
        alignSelf: 'flex-end',
        borderTopRightRadius: 4,
        backgroundColor: '#F0F7FF',
      },
      dialogueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      character: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2E3A59',
      },
      audioButton: {
        padding: 4,
      },
      dialogueContent: {
        gap: 4,
      },
      text: {
        fontSize: 16,
        color: '#2E3A59',
        lineHeight: 24,
      },
      translation: {
        fontSize: 14,
        color: '#8F9BB3',
        fontStyle: 'italic',
        marginTop: 4,
      },

      //KeyboardAvoidingView
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E4E9F2',
      },
      input: {
        flex: 1,
        backgroundColor: '#F1F3F7',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 10,
        fontSize: 16,
        maxHeight: 100,
      },
      iconButton: {
        padding: 8,
      },
      sendButton: {
        padding: 8,
      },
      sendButtonDisabled: {
        opacity: 0.5,
      },
  });