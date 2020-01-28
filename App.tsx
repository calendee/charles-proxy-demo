import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light as theme } from "@eva-design/eva";
import { AppNavigator } from "./src/navigation";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <SafeAreaView style={styles.safeArea}>
        <Layout style={styles.container}>
          <AppNavigator />
        </Layout>
      </SafeAreaView>
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default App;
