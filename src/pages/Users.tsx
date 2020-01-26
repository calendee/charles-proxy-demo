import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Reactotron from "reactotron-react-native";
import easyDB from "easydb-io";
import UUID from "uuid";

// Don't do this in a real app!!!
const db = easyDB({
  database: "35d24c4f-777f-488d-aae6-8e6a894a83bb",
  token: "6b9f600f-a616-4796-9150-3578c7ccf3bf",
});

export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const users = await db
        .get("users")
        .then(users => {
          Reactotron.log(`Got me some users!`, users);
          setUsers(users);
        })
        .catch(err => {
          Reactotron.error("Failed to get users!", null);
          Reactotron.error(err, null);
          if (err.message.includes("404")) {
            // Get a uid and add a user!
            Reactotron.log("No users!!");
            const uuid = UUID();
            Reactotron.log("UUID = ", uuid);
          }
        });
    })();
  }, []);

  Reactotron.log("users = ", users);
  return (
    <View>
      <Text>Users</Text>
    </View>
  );
};
