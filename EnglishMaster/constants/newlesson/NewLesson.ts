import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      content: {
        padding: 16,
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
      },
      section: {
        flex: 1,
        marginHorizontal: 8,
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      image: {
        width: "100%",
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
      },
    });