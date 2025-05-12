import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

interface ThanksModalProps {
  visible: boolean;
  onClose: () => void;
}

const ThanksModal: React.FC<ThanksModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thank You!</Text>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.modalContent}>
              We truly appreciate you choosing EnglishMaster to enhance your
              English skills.{"\n\n"}
              Your dedication to learning is inspiring, and we're honored to be
              part of your journey.{"\n\n"}
              Keep practicing, stay consistent, and remember — every word you
              learn brings you one step closer to fluency.{"\n\n"}
              If you ever need help or want to share feedback, reach out to us
              anytime at support@englishmaster.app.{"\n\n"}
              Happy learning!
            </Text>
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: "#4facfe",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ThanksModal;
