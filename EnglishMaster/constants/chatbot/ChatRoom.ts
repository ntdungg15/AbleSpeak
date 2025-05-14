
import {StyleSheet} from "react-native";

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        flexDirection: "column",
        alignItems: "center",
        
    },

    header: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerTopicText: {
        maxWidth: "70%",

        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginLeft: 26,
        marginTop: 10,
    },

    chatContainer: {
        width: "100%",
        flex: 1,
        backgroundColor: "#F4F8F9",
        
        
    },

    inputContainer: {
        width: "100%",
        height: "8%",
        minHeight: 60,
        
        borderTopColor: "#e0e0e0",
        borderTopWidth: 1,

        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    userMessContainer: {
        marginRight: 22,
        marginTop: 18,
        marginBottom: 18,

        maxWidth: "70%",
        width: "auto",
        height: 'auto',
        minHeight: 28,

        backgroundColor: "white",
        // borderColor: "#e0e0e0",
        // borderWidth: 1,

        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 4,

        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 3,

        paddingHorizontal: 20,
        paddingVertical: 4,
        justifyContent: "center",
    },

    botMessContainer: {
        marginLeft: 22,
        marginTop: 18,
        marginBottom: 18,

        maxWidth: "70%",
        width: "auto",
        height: 'auto',
        minHeight: 28,                  
        
        backgroundColor: "#2D55F8",
        // borderColor: "#e0e0e0",
        // borderWidth: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,

        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 3,
        
        paddingHorizontal: 20,
        paddingVertical: 4,
        alignSelf: "flex-start",
        flexDirection: "column",
        justifyContent: "center",
    },

    voiceAnimationContainer: {
        
        justifyContent: "center",  
        alignItems: "center",   
    },

    stopButton: {
        marginVertical: 4,

        width: 26,
        height: 26,

        borderRadius: 9999,
        backgroundColor: "#5375F1",
        
        alignItems: "center",
        justifyContent: "center",
    },
});