import { useCallback, useEffect, useState } from "react";
import Reactotron from "reactotron-react-native";

const DOMAIN = "https://calendee1.ngrok.io/dogs";

export const useDogs = () => {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchDogs = useCallback(() => {
    setFetching(true);
    fetch(DOMAIN)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(responseJson => {
        setDogs(responseJson);
      })
      .catch(error => {
        Reactotron.log("Failed to fetch dogs", error);
        setError("Failed to fetch dogs");
        setDogs([]);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const saveDog = useCallback(dogDetails => {
    setFetching(true);
    return fetch(DOMAIN, {
      method: dogDetails.id ? "PUT" : "POST",
      body: JSON.stringify(dogDetails),
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
        setDogs(responseJson);
      })
      .catch(error => {
        Reactotron.log("Failed to save dog", error);
        setError("Failed to save dog");
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
    fetchDogs();
  }, []);

  return [
    dogs,
    { error, fetching },
    {
      resetError,
      fetchDogs,
      saveDog,
    },
  ];
};
