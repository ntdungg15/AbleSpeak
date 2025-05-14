import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    footerContainer: {
        width: '100%',
        backgroundColor: '#fff',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        top: -34,
        left: "45%",
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
        zIndex: 1,
      },

      chatInput: {
        height: 54,
        width: 320,

        borderColor: '#4A90E2',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        
        paddingLeft: 16,
      },

      micRingAnimmation: {
        position: 'absolute',
        top: -90,
        left: "30%",

        alignContent: 'center',
        justifyContent: 'center',
        zIndex: 2,
      },
});