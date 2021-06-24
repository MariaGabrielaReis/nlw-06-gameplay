import React from "react";
import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { styles } from "./styles";

import { Header } from "../../components/Header";
import { theme } from "../../global/styles/theme";

export function AppointmentDetails() {
  return (
    <View>
      <Header
        title={"Detalhes"}
        action={
          <BorderlessButton>
            <Fontisto name={"share"} size={20} color={theme.colors.heading} />
          </BorderlessButton>
        }
      />
    </View>
  );
}
