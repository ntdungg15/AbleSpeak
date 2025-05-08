import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        padding: 16,
        paddingBottom: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
      },
      sideIcons: {
        flexDirection: 'row',
        gap: 16,
      },
      iconButton: {
        marginHorizontal: 8,
      },
      micButton: {
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 18,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      },
});