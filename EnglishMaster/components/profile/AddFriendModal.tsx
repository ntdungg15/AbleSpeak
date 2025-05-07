import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface AddFriendModalProps {
  onClose: () => void;
}

const fakeFriends = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "4", name: "David" },
  { id: "5", name: "Eva" },
];

export default function AddFriendModal({ onClose }: AddFriendModalProps) {
  const [searchText, setSearchText] = useState("");
  const [filteredFriends, setFilteredFriends] = useState();

  const handleSearch = (text: string) => {
    setSearchText(text);
    let filtered = [];
    if (text !== "") {
      filtered = fakeFriends.filter((friend) =>
        friend.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }

    setFilteredFriends(filtered);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Friend</Text>
        <TextInput
          style={styles.input}
          placeholder="Search friends..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.friendItem}>
              <Text style={styles.friendName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={{ width: "100%" }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    width: "80%",
    maxHeight: "70%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    width: "100%",
  },
  friendName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
// import {
//   Modal,
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   TextInput,
//   Alert,
// } from "react-native";
// import * as Clipboard from "expo-clipboard";

// interface InviteLinkModalProps {
//   visible: boolean;
//   onClose: () => void;
//   inviteLink: string;
// }
// export default function InviteLinkModal({
//   visible,
//   onClose,
//   inviteLink,
// }: InviteLinkModalProps) {
//   const copyToClipboard = async () => {
//     await Clipboard.setStringAsync(inviteLink);
//     Alert.alert("Copied!", "Invite link has been copied to clipboard.");
//   };

//   return (
//     <Modal transparent={true} visible={visible} animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>Invite Friends</Text>
//           <Text style={styles.label}>Your Invite Link:</Text>
//           <TextInput
//             value={inviteLink}
//             editable={false}
//             style={styles.linkInput}
//           />
//           <View style={styles.buttonRow}>
//             <Pressable style={styles.copyButton} onPress={copyToClipboard}>
//               <Text style={{ color: "#fff" }}>Copy</Text>
//             </Pressable>
//             <Pressable style={styles.closeButton} onPress={onClose}>
//               <Text style={{ color: "#fff" }}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     width: "80%",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 14,
//   },
//   linkInput: {
//     width: "100%",
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   copyButton: {
//     backgroundColor: "#2196f3",
//     padding: 10,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: "center",
//     marginRight: 5,
//   },
//   closeButton: {
//     backgroundColor: "#ff5252",
//     padding: 10,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: "center",
//     marginLeft: 5,
//   },
// });
