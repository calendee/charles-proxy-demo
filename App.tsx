import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Home } from "./src/pages/Home";
import { Users } from "./src/pages/Users";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const AppNavigator = createStackNavigator(
  {
    Home,
    Users,
  },
  {
    initialRouteName: "Home",
  },
);

export default createAppContainer(AppNavigator);
