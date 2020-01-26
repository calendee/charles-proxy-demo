import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e7060611050605.560f08086e760.jpg",
        }}
        style={{ height: 300, width: 400 }}
        resizeMode="contain"
      />
      <Text style={styles.attribution}>
        "Custom 404 Page Design" by Evtimov is licensed under CC BY-NC 4.0
      </Text>

      <Button title="View Users" onPress={() => navigation.navigate("Users")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  attribution: {
    margin: 20,
  },
});
