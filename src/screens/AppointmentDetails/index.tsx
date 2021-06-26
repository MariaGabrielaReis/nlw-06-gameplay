import React from "react";
import { View, ImageBackground, Text, FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";

import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { AppointmentProps } from "../../components/Appointment";

type Params = {
  guildSelected: AppointmentProps;
};

export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const members = [
    {
      id: "1",
      username: "Maby",
      avatar_url: "https://github.com/MariaGabrielaReis.png",
      status: "online",
    },
    {
      id: "2",
      username: "Rodrigo",
      avatar_url: "https://github.com/rodrigorgtic.png",
      status: "offline",
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title={"Detalhes"}
        action={
          <BorderlessButton>
            <Fontisto name={"share"} size={20} color={theme.colors.heading} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      <ListHeader title={"Jogadores"} subtitle={"Total: 3"} />
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title={"Entrar na partida"} />
      </View>
    </View>
  );
}
