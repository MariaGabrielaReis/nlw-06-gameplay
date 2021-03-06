import React from "react";
import { StatusBar, LogBox } from "react-native";
import { useFonts } from "expo-font";
/* uso de fontes externas */
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";
/* Lib para segurar a tela de splash */
import AppLoading from "expo-app-loading";

import { Routes } from "./src/routes";
import { AuthProvider } from "./src/hooks/auth";

/* Ignora esse alerta no terminal */
LogBox.ignoreLogs([
  "You are not currently signed in to Expo on your development machine.",
]);

export default function App() {
  const [fontsLoad] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  if (!fontsLoad) {
    //segura a tela de splash até que as fonts sejam baixadas
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}
