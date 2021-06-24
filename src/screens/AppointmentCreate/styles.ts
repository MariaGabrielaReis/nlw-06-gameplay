import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.highlight,
    fontSize: 18,
    marginBottom: 16,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  select: {
    width: "100%",
    height: 68,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    alignItems: "center",
    paddingRight: 25,
    overflow: "hidden",
  },
  selectBody: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 68,
    height: 68,
    backgroundColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.gray,
  },
  field: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    marginRight: 4,
    fontFamily: theme.fonts.text500,
    color: theme.colors.highlight,
    fontSize: 18,
  },
  characterLimit: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 24,
    marginTop: 24,
  },
});
