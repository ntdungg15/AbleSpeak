import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",

        position: "relative",
    },
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 120,

        backgroundColor: "#4A90E2",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        paddingTop: 60,
    },

    mainContainer: {
        marginTop: 120,
        flex: 1,

        paddingHorizontal: 14,
        paddingVertical: 14,

        
    },

    cardContainer: {
        margin: 4,
        width: 160,
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",

        paddingHorizontal: 4,
        borderWidth: 1,
      },
      cardImage: {
        width: 160,
        height: 160,
        
      },
      cardTitle: {
        
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
      },
})