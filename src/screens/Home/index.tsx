import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import { Profile } from "../../components/Profile";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
      </View>
    </View>
  );
}
