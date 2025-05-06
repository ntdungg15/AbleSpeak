import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import { useSelector } from "react-redux";
import { updateUserInfo } from "@/api/user";
import { router } from "expo-router";

const UpdateProfile = ({ navigation }) => {
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [haveChanged, setHaveChanged] = useState(false);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.userInfo.name);
  const [password, setPassword] = useState(user.password);

  // Handle the back button press when there are unsaved changes
  useEffect(() => {
    const backAction = () => {
      if (haveChanged) {
        Alert.alert(
          "Unsaved changes",
          "You have unsaved changes. Do you want to leave without saving?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Leave",
              onPress: () => router.back(),
            },
          ]
        );
        return true; // Prevent the default back action
      }
      return false; // Allow back navigation
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Clean up the event listener when the component is unmounted
    return () => backHandler.remove();
  }, [haveChanged, navigation]);

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://i.pinimg.com/736x/86/82/12/8682125231a362848c3743c444f1ce98.jpg",
          }}
        />
        <Pressable>
          <Text style={styles.changeAvatar}>Update Avatar</Text>
        </Pressable>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.titleSection}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setHaveChanged(true);
          }}
        />

        <Text style={styles.titleSection}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setHaveChanged(true);
          }}
          secureTextEntry
        />

        <Text style={styles.titleSection}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={user.userInfo.email}
          editable={false}
        />
      </View>

      <View style={styles.confirmContainer}>
        <Pressable
          style={styles.confirmButton}
          onPress={async () => {
            if (haveChanged) {
              const response = await updateUserInfo(
                name,
                user.userInfo.email,
                password
              );
              if (response) {
                user.userInfo.name = name;
                user.password = password;

                setConfirmUpdate(true);
                setHaveChanged(false);
              } else {
                setConfirmUpdate(false);
              }
            }
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Update</Text>
        </Pressable>
        {confirmUpdate && (
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Profile updated successfully!
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 10,
  },
  changeAvatar: {
    fontWeight: "bold",
    fontSize: 20,
    color: "blue",
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  titleSection: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 17,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#888",
  },
  confirmContainer: {
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "30%",
  },
});

export default UpdateProfile;
