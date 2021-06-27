import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

import { styles } from "./styles";

import { Button } from "../../components/Button";

export function DropDatabaseSuccess() {
  const navigation = useNavigation();
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>É isso aí!</Text>
      <Text style={styles.success}>
        Todas as partidas foram apagadas com sucesso!
      </Text>
      <View style={styles.buttonConfirm}>
        <Button title={"Voltar"} onPress={handleGoBack} />
      </View>
    </View>
  );
}
