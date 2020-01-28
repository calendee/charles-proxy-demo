import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import Reactotron from "reactotron-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUsers } from "../hooks/useUsers";

export const SaveUser = ({ navigation }) => {
  const passedUser = navigation.getParam("user") || {};
  Reactotron.log("Passed user = ", passedUser);
  const [, statusInfo, userApi] = useUsers();

  const [firstName, setFirstName] = useState(passedUser.firstName || "");
  const [lastName, setLastName] = useState(passedUser.lastName || "");
  const [email, setEmail] = useState(passedUser.email || "");
  const [id] = useState(passedUser.id || null);
  const [profileImage, setProfileImage] = useState(
    passedUser.profileImage || "",
  );
  const [valid, setValid] = useState(true);
  const saveUser = () => {
    if (!firstName || !lastName || !email || !profileImage) {
      setValid(false);
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      profileImage,
      id,
    };

    userApi.saveUser(user).then(() => {
      navigation.goBack();
    });
  };

  const resetValid = useCallback(() => {
    setValid(true);
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
      <Layout style={styles.layout}>
        <Input
          autoCompleteType="name"
          keyboardType="name-phone-pad"
          textContentType="givenName"
          label="First Name"
          placeholder="Your first name"
          value={firstName}
          onChangeText={setFirstName}
          onFocus={resetValid}
          style={styles.input}
        />
        <Input
          autoCompleteType="name"
          keyboardType="name-phone-pad"
          textContentType="familyName"
          label="Last Name"
          placeholder="Your last name"
          value={lastName}
          onChangeText={setLastName}
          onFocus={resetValid}
          style={styles.input}
        />
        <Input
          autoCompleteType="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          label="Email"
          placeholder="Your email address"
          value={email}
          onChangeText={setEmail}
          onFocus={resetValid}
          style={styles.input}
        />
        <Input
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          textContentType="URL"
          label="Profile Image"
          placeholder="A link to your profile image"
          value={profileImage}
          onChangeText={setProfileImage}
          onFocus={resetValid}
          style={styles.input}
        />
        <Button
          onPress={saveUser}
          style={styles.saveButton}
          disabled={statusInfo.fetching}
        >
          SAVE
        </Button>
        {valid ? null : (
          <Text category="s1" status="danger" style={styles.errorText}>
            Please complete the form
          </Text>
        )}
        {statusInfo.error ? (
          <Text category="s1" status="danger" style={styles.errorText}>
            Oops... Something went wrong. Please try again.
          </Text>
        ) : null}
      </Layout>
    </KeyboardAwareScrollView>
  );
};

SaveUser.navigationOptions = ({ navigation }) => {
  const user = navigation.getParam("user");

  return {
    title: user ? "Edit User" : "Add User",
  };
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 15,
  },
  input: {
    marginBottom: 10,
  },
  layout: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  saveButton: {
    marginTop: 15,
  },
  scrollView: {
    flex: 1,
  },
});
