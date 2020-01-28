import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export const DogProfile = ({ name, saying, profileImage, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Layout style={styles.layout}>
        <Image
          source={{
            uri: profileImage,
            cache: "reload",
          }}
          style={{ height: 100, width: 100 }}
          resizeMode="contain"
        />
        <Layout style={styles.info}>
          <Text category="h2">{`${name}`}</Text>
          <Text category="s1">{`${saying}`}</Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
  },
  layout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: "center",
  },
});
