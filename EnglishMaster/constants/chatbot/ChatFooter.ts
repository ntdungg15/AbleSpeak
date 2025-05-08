import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    footerContainer: {
        width: '100%',
        backgroundColor: '#fff',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 16,
        paddingBottom: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
      },
      
      iconButton: {
        marginHorizontal: 30,
      },
      micButton: {
        position: 'absolute',
        top: -30,
        left: '45%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 5,

        borderRadius: 40,
        padding: 18,
      },
});