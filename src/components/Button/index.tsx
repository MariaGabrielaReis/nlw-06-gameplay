import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
/* essa opção de botão se adequa melhor ao estilo de botão cada sistema */
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

/* dá pra fazer propriedades baseadas em propriedades pré-existentes */
type Props = TouchableOpacityProps & {
  title: string;
  non_filled?: boolean;
  logout?: boolean;
};

export function Button({ title, non_filled, logout, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: non_filled
            ? theme.colors.background
            : theme.colors.primary,
          width: logout ? 160 : "100%",
          marginRight: logout ? 16 : 0,
        },
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.title,
          { color: non_filled ? theme.colors.secondary : theme.colors.heading },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
