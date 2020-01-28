import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { SaveUser } from "./pages/SaveUser";

const HomeNavigator = createStackNavigator(
  {
    Home,
    Users,
    SaveUser,
  },
  {
    initialRouteName: "Home",
  },
);

export const AppNavigator = createAppContainer(HomeNavigator);
