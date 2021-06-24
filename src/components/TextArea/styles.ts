import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 96,
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: "center",
    marginRight: 4,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
