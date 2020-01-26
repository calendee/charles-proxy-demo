import Reactotron from "reactotron-react-native";
import { AsyncStorage } from "react-native";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "Charles Proxy Demo",
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
    editor: false,
    errors: { veto: stackFrame => false },
    overlay: false,
  })
  .connect();
