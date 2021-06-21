import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: theme.colors.background,
  },
  icon: {
    width: 24,
    height: 18,
  },
  title: {
    flex: 1,
    color: theme.colors.heading,
    fontSize: 18,
    textAlign: "center",
  },
});
