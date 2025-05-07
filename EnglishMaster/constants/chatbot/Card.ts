import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cardListsContainer: {
        width: "100%",
        height: 160,

    },

    cardContainer: {
        width: 140,
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
    },

    cardImage: {
        marginBottom: 6,
        width: 128,
        height: 120,

        borderRadius: 8,
    },

    cardTitle: {
        position: "absolute",
        bottom: "6%",
        left: "6%",

        fontSize: 14,
        fontWeight: "bold",


    },
})