import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "../global/styles/theme";

import { Home } from "../screens/Home";
import { AppointmentDetails } from "../screens/AppointmentDetails";
import { AppointmentCreate } from "../screens/AppointmentCreate";
import { DropDatabaseSuccess } from "../screens/DropDatabaseSuccess";

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      headerMode={"none"}
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Screen name={"Home"} component={Home} />
      <Screen name={"AppointmentDetails"} component={AppointmentDetails} />
      <Screen name={"AppointmentCreate"} component={AppointmentCreate} />
      <Screen name={"DropDatabaseSuccess"} component={DropDatabaseSuccess} />
    </Navigator>
  );
}
