import React, { useState } from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { styles } from "./styles";

import { Avatar } from "../Avatar";
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";

export function Profile() {
  const { user, singOut } = useAuth();
  const [openGuildModal, setOpenGuildModal] = useState(false);

  function handleOpenModal() {
    setOpenGuildModal(true);
  }

  function handleCloseModal() {
    setOpenGuildModal(false);
  }

  function handleLogOut() {
    singOut();
  }

  return (
    <>
      <View style={styles.container}>
        <RectButton onPress={handleOpenModal}>
          <Avatar urlImage={user.avatar} />
        </RectButton>
        <View>
          <View style={styles.user}>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.username}>{user.firstName}</Text>
          </View>

          <Text style={styles.message}>Hoje é dia de vitória</Text>
        </View>
      </View>

      <ModalView visible={openGuildModal} closeModal={handleCloseModal} logout>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>Quer mesmo sair?</Text>
          <View style={styles.modalContent}>
            <Button title={"Não"} logout non_filled />
            <Button title={"Sim"} onPress={handleLogOut} logout />
          </View>
        </View>
      </ModalView>
    </>
  );
}
