import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 24,
    color: theme.colors.heading,
    marginBottom: 10,
  },
  success: {
    fontFamily: theme.fonts.text500,
    fontSize: 16,
    color: theme.colors.heading,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  buttonConfirm: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});
