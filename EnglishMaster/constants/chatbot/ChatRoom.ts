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
        backgroundColor: "#f8f8f8",
        
        
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
    }
});