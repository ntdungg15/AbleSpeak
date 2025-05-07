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
        width: "100%",
        height: "100%",

        paddingHorizontal: 14,
        paddingVertical: 14,

        
    },

    cardContainer: {
        margin: 4,

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