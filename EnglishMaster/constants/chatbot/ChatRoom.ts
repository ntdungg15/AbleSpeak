import {StyleSheet} from "react-native";

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        flexDirection: "column",
        alignItems: "center",
        
    },

    header: {
        width: "100%",
        height: "8%",
        backgroundColor: "white",
        // shadow 
            //iOS
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //Android
            elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    chatContainer: {
        width: "100%",
        height: "84%",
    
        backgroundColor: "#f8f8f8",
        
        
    },

    inputContainer: {
        width: "100%",
        height: "8%",
        
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "white",
        // shadow 
            //iOS
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //Android
            elevation: 5,


        flexDirection: "row",
    }
});