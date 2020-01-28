import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import Reactotron from "reactotron-react-native";

import { useUsers } from "../hooks/useUsers";
import { UserItem } from "../components/UserItem";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Users = ({ navigation }) => {
  const [users, statusInfo, userApi] = useUsers();

  useEffect(() => {
    const listener = navigation.addListener("willFocus", () => {
      userApi.fetchUsers();
    });

    return () => {
      listener.remove();
    };
  }, []);

  const goToSaveUser = user => {
    Reactotron.log("goToSaveUser -> user", user);
    navigation.navigate("SaveUser", { user });
  };

  if (statusInfo.fetching) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Layout style={styles.layout}>
        {users && !statusInfo.error && users.length ? (
          <>
            {users.map(user => (
              <UserItem
                {...user}
                key={user.id}
                onPress={() => {
                  goToSaveUser(user);
                }}
              />
            ))}
          </>
        ) : (
          <Text category="s1">No Users Available</Text>
        )}
        {statusInfo.error ? (
          <Text category="s1">Uh oh ... Something went wrong!</Text>
        ) : null}
        <Button onPress={goToSaveUser}>Add A User</Button>
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
});
