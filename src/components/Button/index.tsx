import React from "react";
import { Text } from "react-native";
/* essa opção de botão se adequa melhor ao estilo de botão cada sistema */
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";

/* dá pra fazer propriedades baseadas em propriedades pré-existentes */
type Props = RectButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
