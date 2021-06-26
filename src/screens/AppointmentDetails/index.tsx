import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  FlatList,
  Alert,
  Share,
  Platform,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../services/api";
import * as Linking from "expo-linking";
import { parseISO, formatDistanceStrict, addHours } from "date-fns";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";

import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Button } from "../../components/Button";
import { AppointmentProps } from "../../components/Appointment";
import { Load } from "../../components/Load";

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );

      setWidget(response.data);
    } catch (error) {
      setError(true);
      // Alert.alert(
      //   "Ops...",
      //   "Verifique as configurações do servidor. Será que o widget está habilitado?",
      //   [
      //     {
      //       text: "Ok!",
      //       onPress: () => handleGoBack(),
      //     },
      //   ]
      // );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === "ios"
        ? `Junte-se a ${guildSelected.guild.name}`
        : `${widget.instant_invite}`;

    Share.share({ message, url: widget.instant_invite });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  function dateToAppointment(dateTime: number | Date) {
    let response = "";

    if (parseISO(String(dateTime)) > addHours(new Date(), -3)) {
      const distance = formatDistanceStrict(
        parseISO(String(dateTime)),
        addHours(new Date(), -3),
        {
          unit: "minute",
        }
      );

      const time = Number(distance.split(" ")[0]);

      if (time / 60 / 24 >= 30) {
        response = `Falta mais de um mês para a partida começar!`;
      } else {
        if (time / 60 >= 24) {
          response = `Falta ${Math.floor(
            time / 60 / 24
          )} dia(s) para a partida começar!`;
        } else {
          if (time > 60) {
            response = `Falta ${Math.floor(
              time / 60
            )} hora(s) para a partida começar!`;
          } else {
            response = `Falta ${time} minuto(s) para a partida começar!`;
          }
        }
      }
    } else {
      response = `Essa partida já rolou, hein`;
    }

    return response;
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={"Detalhes"}
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name={"share"} size={20} color={theme.colors.heading} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {error ? (
        <View style={styles.errorContainer}>
          <View>
            <Text style={styles.errorTitle}>Ops...</Text>
            <Text style={styles.errorMessage}>
              Verifique as configurações do servidor. {"\n"}
              Será que o widget está habilitado?
            </Text>
          </View>
        </View>
      ) : loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title={"Jogadores"}
            subtitle={`Total: ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
        </>
      )}

      <Text style={styles.footer}>
        {dateToAppointment(guildSelected.dateTimeNotification)}
      </Text>

      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title={"Entrar na partida"} onPress={handleOpenGuild} />
        </View>
      )}
    </View>
  );
}
