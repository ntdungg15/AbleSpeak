import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = 160;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 40,
      paddingBottom: 16,
      backgroundColor: "#6a3093",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: "rgba(255,255,255,0.8)",
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
    },
    loaderText: {
      marginTop: 12,
      fontSize: 16,
      color: "#6a3093",
    },
    categoriesContainer: {
      paddingVertical: 12,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      zIndex: 10,
    },
    categoriesScroll: {
      paddingHorizontal: 16,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: 20,
      backgroundColor: "#f0f0f0",
    },
    categoryButtonActive: {
      backgroundColor: "#6a3093",
    },
    categoryText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#666",
    },
    categoryTextActive: {
      color: "#fff",
    },
    list: {
      padding: 16,
      paddingBottom: 32,
    },
    card: {
      width: CARD_WIDTH,
      marginHorizontal: 8,
      marginBottom: 16,
      borderRadius: 12,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: "hidden",
    },
    cardImageContainer: {
      position: "relative",
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    },
    thumb: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    cardGradient: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
    },
    cardContent: {
      padding: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      color: "#333",
      marginBottom: 2,
    },
    pronunciation: {
      fontSize: 12,
      color: "#888",
    },
    
    /* Modal */
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    closeButtonContainer: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 100,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: width * 0.9,
      maxHeight: height * 0.85,
      backgroundColor: "#fff",
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 15,
    },
    modalImage: {
      width: "100%",
      height: 220,
      resizeMode: "cover",
    },
    modalInfoContainer: {
      padding: 20,
    },
    modalHeader: {
      alignItems: "center",
      marginBottom: 16,
    },
    modalWord: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#222",
      marginBottom: 4,
      textAlign: "center",
    },
    modalPron: {
      fontSize: 18,
      color: "#666",
      textAlign: "center",
    },
    divider: {
      height: 2,
      borderRadius: 1,
      marginVertical: 12,
    },
    modalDefinitionContainer: {
      maxHeight: 220,
      marginBottom: 16,
    },
    modalDef: {
      fontSize: 16,
      lineHeight: 24,
      color: "#333",
      marginBottom: 16,
    },
    examplesContainer: {
      marginTop: 8,
    },
    examplesTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
      marginBottom: 8,
    },
    exampleItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
      paddingLeft: 8,
    },
    exampleText: {
      flex: 1,
      fontSize: 16,
      color: "#444",
      marginLeft: 8,
      lineHeight: 22,
    },
    closeBtn: {
      borderRadius: 12,
      overflow: "hidden",
    },
    closeBtnGradient: {
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    closeText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
  