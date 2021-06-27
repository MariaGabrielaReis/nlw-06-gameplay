import React, { useState, useCallback } from "react";
import { View, FlatList, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { styles } from "./styles";

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { Button } from "../../components/Button";

export function Home() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  async function deleteAppointments() {
    await AsyncStorage.removeItem(COLLECTION_APPOINTMENTS);
  }

  async function handleDeleteAppointments() {
    Alert.alert("Caaaalma", "Quer mesmo limpar a agenda?", [
      {
        text: "Não, não",
        style: "cancel",
      },
      {
        text: "Manda bala",
        onPress: () => {
          deleteAppointments();
          navigation.navigate("DropDatabaseSuccess");
        },
      },
    ]);
  }

  /* 
    Flatlist é boa opção quando se precisa listar muitos itens: ela
    renderiza só os itens que vão aparecer na tela, e não todos de uma vez
    != 
    Scrollview (category select): melhor quando tem menos elementos
  */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Load />
      ) : appointments.length < 1 ? (
        <ListHeader
          title={"Agende uma partida para começar!"}
          subtitle={`em "+"`}
        />
      ) : (
        <>
          <ListHeader
            title={"Partidas agendadas"}
            subtitle={`Total: ${appointments.length}`}
          />

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 32 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <Button
              title={"Excluir todas as partidas"}
              onPress={handleDeleteAppointments}
            />
          </View>
        </>
      )}
    </View>
  );
}
