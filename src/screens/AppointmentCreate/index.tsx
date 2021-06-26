import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
/* lib para ícones */
import { Feather } from "@expo/vector-icons";
import { parseISO, isAfter, addHours } from "date-fns";

import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";

export function AppointmentCreate() {
  const [category, setCategory] = useState("");
  const [openGuildModal, setOpenGuildModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleOpenGuilds() {
    setOpenGuildModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildModal(false);
  }

  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setOpenGuildModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const dateTimeNotification = `2021-${month}-${day} ${hour}:${minute}:00`;
    const parsedDate = addHours(parseISO(dateTimeNotification), -3);

    const future = isAfter(parsedDate, addHours(new Date(), -3));

    if (!future) {
      Alert.alert(
        "Viajante no tempo é?",
        "Informe uma data e hora válida no futuro, não no passado ou dados inválidos!",
        [
          {
            text: "Fechou",
          },
        ]
      );
    } else {
      const newAppointment = {
        id: uuid.v4(),
        guild,
        category,
        date: `${day}/${month} às ${hour}:${minute}`,
        description,
        dateTimeNotification: parsedDate,
      };

      if (
        !newAppointment.guild ||
        !newAppointment.category ||
        !newAppointment.date ||
        !newAppointment.description
      ) {
        Alert.alert(
          "Não tá esquecendo nada não?",
          "Preencha todos os campos para agendar uma partida!",
          [
            {
              text: "Beleza",
            },
          ]
        );
      } else {
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
          COLLECTION_APPOINTMENTS,
          JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate("Home");
      }
    }
  }

  /* a Scroll View tbm permite a rolagem da tela toda (pra dispositivos menores) */
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header title={"Agendar partida"} />

      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.label, { marginLeft: 24, marginTop: 32 }]}>
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={[styles.label, { marginBottom: 0 }]}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>
                <Feather
                  name={"chevron-right"}
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={styles.label}>Dia e mês</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Hora e minuto</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                </View>
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.characterLimit}>Max. 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.footer}>
            <Button title={"Agendar"} onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
      <ModalView visible={openGuildModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
