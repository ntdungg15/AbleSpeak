import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <Text style={styles.modalContent}>
            This is the privacy policy content...
          </Text>
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
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#4facfe",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PrivacyPolicyModal;
