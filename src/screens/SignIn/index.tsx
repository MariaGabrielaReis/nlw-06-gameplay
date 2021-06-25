import React from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import IllustrationImg from "../../assets/illustration.png";

import { ButtonIcon } from "../../components/ButtonIcon";

export function SignIn() {
  const navigation = useNavigation();
  const { user } = useAuth();

  function handleSignIn() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Image
        source={IllustrationImg}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se {"\n"} e organize suas {"\n"} jogatinas
        </Text>
        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games {"\n"} favoritos com seus amigos
        </Text>

        <ButtonIcon title={"Entrar com Discord"} onPress={handleSignIn} />
      </View>
    </View>
  );
}
