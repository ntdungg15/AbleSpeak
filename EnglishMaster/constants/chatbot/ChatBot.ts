import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
        position: "relative",
        

    },

    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 60,

        backgroundColor: "#4A90E2",

        alignItems: "center",
    },

    mainContainerScroll: {
        flex: 1,
        marginTop: 60, // Adjust this value to the height of your header
        
        backgroundColor: "#FFF",
        padding: 16,
  
    },
    mainContainerView: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    classicContainer: {
        marginVertical: 8,
        marginHorizontal: 8,
        
        height: 200,

        
        
    },

    textcardheader: {
        marginVertical: 8,

        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },

    classicContent: {
        width: "100%",
        height: "auto",

        backgroundColor: "#F0F4F8",
        display: "flex",
        flexDirection: "row",

    },

    classicImage: {
        
        width: 140,
        height: 140,
        
        
    },  

    topicContainer: {
        marginVertical: 8,
        marginHorizontal: 16,
        
        height: 200,

        // backgroundColor: "#F0F4F8",
    },

    classicTextContainer: {
        marginLeft: 16,
        width: 160,
        height: "auto",

        display: "flex",
        flexDirection: "column",

        
        padding: 4,
    },

    classicContentText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },

    classicStartButton: {
        marginTop: 16,
        backgroundColor: '#4A90E2',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    classicStartButtonText: {
        marginRight: 6,

        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    roleplayHeader: {
        


        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",


    },
});