import { useCallback, useEffect, useState } from "react";
import Reactotron from "reactotron-react-native";

const DOMAIN = "https://calendee1.ngrok.io/users";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchUsers = useCallback(() => {
    setFetching(true);
    fetch(DOMAIN)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(responseJson => {
        setUsers(responseJson);
      })
      .catch(error => {
        Reactotron.log("Failed to fetch users!!!", error);
        setError("Failed to fetch users!");
        setUsers([]);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const saveUser = useCallback(userDetails => {
    setFetching(true);
    return fetch(DOMAIN, {
      method: userDetails.id ? "PUT" : "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(responseJson => {
        setUsers(responseJson);
      })
      .catch(error => {
        Reactotron.log("Failed to save user!", error);
        setError("Failed to save user");
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    resetError();
    fetchUsers();
  }, []);

  return [
    users,
    { error, fetching },
    {
      resetError,
      fetchUsers,
      saveUser,
    },
  ];
};
