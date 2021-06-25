import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import PlayerSvg from "../../assets/player.svg";
import CalendarSvg from "../../assets/calendar.svg";

import { GuildIcon } from "../GuildIcon";
import { GuildProps } from "../Guild";
import { categories } from "../../utils/categories";

export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
};

type Props = RectButtonProps & {
  data: AppointmentProps;
};

export function Appointment({ data, ...rest }: Props) {
  const [category] = categories.filter((item) => item.id === data.category);
  const { owner } = data.guild;
  const { primary, secondary } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <GuildIcon />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>
            <Text style={styles.category}>{category.title}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />
              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? secondary : primary} />
              <Text
                style={[styles.player, { color: owner ? secondary : primary }]}
              >
                {owner ? "Antitrião" : "Visitante"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
