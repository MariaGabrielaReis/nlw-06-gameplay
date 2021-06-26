import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 68,
    height: 68,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: theme.colors.discord,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 68,
    height: 68,
  },
});
