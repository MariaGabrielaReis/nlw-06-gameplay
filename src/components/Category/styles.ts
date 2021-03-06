import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  },
  content: {
    width: 104,
    height: 116,
    borderRadius: 8,
    backgroundColor: theme.colors.gray,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  title: {
    fontFamily: theme.fonts.title500,
    color: theme.colors.heading,
    fontSize: 15,
  },
  check: {
    width: 12,
    height: 12,
    alignSelf: "flex-end",
    marginRight: 12,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 3,
  },
  checked: {
    width: 12,
    height: 12,
    alignSelf: "flex-end",
    marginRight: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
});
