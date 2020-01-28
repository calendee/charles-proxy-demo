import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import Reactotron from "reactotron-react-native";

import { useDogs } from "../hooks/useDogs";
import { DogProfile } from "../components/DogProfile";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Dogs = ({ navigation }) => {
  const [dogs, statusInfo, dogApi] = useDogs();

  useEffect(() => {
    const listener = navigation.addListener("willFocus", () => {
      dogApi.fetchDogs();
    });

    return () => {
      listener.remove();
    };
  }, []);

  const goToSaveDog = dog => {
    Reactotron.log("goToSaveDog -> dog", dog);
    navigation.navigate("SaveDog", { dog: dog });
  };

  if (statusInfo.fetching) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Layout style={styles.layout}>
        {dogs && !statusInfo.error && dogs.length ? (
          <>
            {dogs.map(dog => (
              <DogProfile
                {...dog}
                key={dog.id}
                onPress={() => {
                  goToSaveDog(dog);
                }}
              />
            ))}
          </>
        ) : (
          <Text category="h1">No 🐕?!</Text>
        )}
        {statusInfo.error ? (
          <Text category="s1">Uh oh ... Something went wrong!</Text>
        ) : null}
        <Button onPress={goToSaveDog} style={styles.button}>
          ADD 🐶
        </Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  button: {
    marginTop: 10,
  },
});
