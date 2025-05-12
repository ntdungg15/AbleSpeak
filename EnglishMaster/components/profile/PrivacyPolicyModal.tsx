import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
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
          <Text style={styles.modalTitle}>Privacy Policy – EnglishMaster</Text>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.modalContent}>
              Effective Date: May 12, 2025{"\n\n"}
              Welcome to EnglishMaster. We value your privacy and are committed
              to protecting your personal information. This Privacy Policy
              explains how we collect, use, and protect the data you provide
              when using our app.{"\n\n"}
              1. Information We Collect{"\n"}- Personal Information: such as
              your name and email address when you register or contact us.{"\n"}
              - Usage Data: including features you use, lessons completed,
              progress, and time spent in the app.{"\n"}- Device Information:
              such as device type, operating system, and app version to improve
              your experience.{"\n\n"}
              2. How We Use Your Information{"\n"}
              We use the information we collect to:{"\n"}- Provide and improve
              learning experiences{"\n"}- Personalize content and track progress
              {"\n"}- Respond to your feedback or support requests{"\n"}-
              Analyze app performance and usage trends{"\n\n"}
              3. Data Sharing{"\n"}
              We do not sell or rent your personal data. We may share data with
              trusted third-party service providers for analytics or backend
              support, under strict confidentiality agreements.{"\n\n"}
              4. Security{"\n"}
              We take appropriate security measures to protect your data from
              unauthorized access, alteration, disclosure, or destruction.
              {"\n\n"}
              5. Children’s Privacy{"\n"}
              EnglishMaster is intended for users aged 13 and above. We do not
              knowingly collect personal data from children under 13.{"\n\n"}
              6. Your Rights{"\n"}
              You have the right to:{"\n"}- Access the data we store about you
              {"\n"}- Request correction or deletion of your data{"\n"}-
              Withdraw consent at any time{"\n\n"}
              To make a request, please contact us at support@englishmaster.app
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

export default PrivacyPolicyModal;
