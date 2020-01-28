import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import Reactotron from "reactotron-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDogs } from "../hooks/useDogs";

export const SaveDog = ({ navigation }) => {
  const passedDog = navigation.getParam("dog") || {};
  Reactotron.log("Passed dog = ", passedDog);
  const [, statusInfo, dogApi] = useDogs();

  const [id] = useState(passedDog.id || null);
  const [name, setName] = useState(passedDog.name || "");
  const [saying, setSaying] = useState(passedDog.saying || "");
  const [profileImage, setProfileImage] = useState(
    passedDog.profileImage || "",
  );
  const [valid, setValid] = useState(true);
  const saveDog = () => {
    Reactotron.log("Save Dog!", name, saying, profileImage);
    if (!name || !saying || !profileImage) {
      setValid(false);
      return;
    }

    const dog = {
      name,
      saying,
      profileImage,
      id,
    };

    dogApi.saveDog(dog).then(() => {
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
          textContentType="name"
          label="Doggo's Name"
          placeholder="Your name, dog"
          value={name}
          onChangeText={setName}
          onFocus={resetValid}
          style={styles.input}
        />
        <Input
          autoCapitalize="words"
          autoCorrect={false}
          label="Favorite Saying"
          placeholder="What's up, dog?"
          value={saying}
          onChangeText={setSaying}
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
          placeholder="No pics, didn't happen"
          value={profileImage}
          onChangeText={setProfileImage}
          onFocus={resetValid}
          style={styles.input}
        />
        <Button
          onPress={saveDog}
          style={styles.saveButton}
          disabled={statusInfo.fetching}
        >
          SAVE
        </Button>
        {valid ? null : (
          <Text category="s1" status="danger" style={styles.errorText}>
            Please complete the form, dog!
          </Text>
        )}
        {statusInfo.error ? (
          <Text category="s1" status="danger" style={styles.errorText}>
            💩... Something went wrong. Please try again.
          </Text>
        ) : null}
      </Layout>
    </KeyboardAwareScrollView>
  );
};

SaveDog.navigationOptions = ({ navigation }) => {
  const dog = navigation.getParam("dog");

  return {
    title: dog ? "Edit Dog" : "Add 🐶",
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
