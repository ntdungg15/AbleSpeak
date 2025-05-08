
import {StyleSheet} from "react-native";

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        flexDirection: "column",
        alignItems: "center",
        
    },

    header: {
        width: "100%",
        height: 64,
        backgroundColor: "white",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    chatContainer: {
        width: "100%",
        flex: 1,
        backgroundColor: "#D7F1F9FF",
        
        
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
        borderRadius: 12,

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
        
        backgroundColor: "#4098F7FF",
        // borderColor: "#e0e0e0",
        // borderWidth: 1,
        borderRadius: 12,
        
        paddingHorizontal: 20,
        paddingVertical: 4,
        alignSelf: "flex-start",
        justifyContent: "center",
    },
});