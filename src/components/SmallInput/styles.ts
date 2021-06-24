import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: "center",
    marginRight: 4,
  },
});
