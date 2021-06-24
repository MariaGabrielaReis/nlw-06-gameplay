import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

type Props = {
  modal?: boolean;
};

export function ListDivider({ modal }: Props) {
  return <View style={[styles.container, { width: modal ? "72%" : "78%" }]} />;
}
