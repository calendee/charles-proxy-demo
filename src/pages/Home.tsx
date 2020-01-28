import React from "react";
import { StyleSheet } from "react-native";
import { Button, Layout } from "@ui-kitten/components";

export const Home = ({ navigation }) => {
  const goToUsers = () => {
    navigation.navigate("Users");
  };

  return (
    <>
      <Layout style={styles.layout}>
        <Button onPress={goToUsers}>VIEW USERS</Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
