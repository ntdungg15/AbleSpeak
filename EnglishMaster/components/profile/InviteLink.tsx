import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";

interface InviteLinkModalProps {
  visible: boolean;
  onClose: () => void;
  inviteLink: string;
}
export default function InviteLinkModal({
  visible,
  onClose,
  inviteLink,
}: InviteLinkModalProps) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteLink);
    Alert.alert("Copied!", "Invite link has been copied to clipboard.");
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Invite Friends</Text>
          <Text style={styles.label}>Your Invite Link:</Text>
          <TextInput
            value={inviteLink}
            editable={false}
            style={styles.linkInput}
          />
          <View style={styles.buttonRow}>
            <Pressable style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={{ color: "#fff" }}>Copy</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={{ color: "#fff" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  linkInput: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  copyButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
});
