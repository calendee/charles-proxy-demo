import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";

export const LoadingSpinner = () => (
  <Layout style={styles.container}>
    <Spinner size="giant" status="basic" />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    zIndex: 10,
  },
});
