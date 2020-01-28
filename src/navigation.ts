import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home } from "./pages/Home";
import { Dogs } from "./pages/Dogs";
import { SaveDog } from "./pages/SaveDog";

const HomeNavigator = createStackNavigator(
  {
    Home,
    Dogs,
    SaveDog,
  },
  {
    initialRouteName: "Home",
  },
);

export const AppNavigator = createAppContainer(HomeNavigator);
