import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

interface TermsOfServiceModalProps {
  visible: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Terms of Service – EnglishMaster
          </Text>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.modalContent}>
              Effective Date: May 12, 2025{"\n\n"}
              By using EnglishMaster, you agree to comply with and be bound by
              the following Terms of Service. Please read them carefully.
              {"\n\n"}
              1. Use of the App{"\n"}
              EnglishMaster is provided for your personal, non-commercial use
              only. You agree not to use the app for any unlawful purpose or in
              a way that may harm the app or its users.{"\n\n"}
              2. User Accounts{"\n"}
              When creating an account, you must provide accurate information.
              You are responsible for maintaining the confidentiality of your
              account and password.{"\n\n"}
              3. Intellectual Property{"\n"}
              All content, including lessons, graphics, logos, and code, is the
              property of EnglishMaster and protected by copyright laws. You may
              not reuse or redistribute any part of the app without permission.
              {"\n\n"}
              4. User Conduct{"\n"}
              You agree not to upload or distribute any content that is harmful,
              offensive, or violates any laws or the rights of others.{"\n\n"}
              5. Modifications{"\n"}
              We may update or modify the app or these Terms at any time.
              Continued use of the app after changes indicates your acceptance
              of the new Terms.{"\n\n"}
              6. Termination{"\n"}
              We reserve the right to suspend or terminate your account if you
              violate these Terms.{"\n\n"}
              7. Disclaimer and Limitation of Liability{"\n"}
              EnglishMaster is provided "as is" without warranties of any kind.
              We are not liable for any direct, indirect, or incidental damages
              arising from your use of the app.{"\n\n"}
              8. Contact Us{"\n"}
              If you have any questions about these Terms, please contact us at
              support@englishmaster.app
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 15,
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

export default TermsOfServiceModal;
