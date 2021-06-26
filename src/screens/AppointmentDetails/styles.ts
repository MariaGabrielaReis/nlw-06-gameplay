import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: "100%",
    height: 234,
  },
  bannerContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 24,
    paddingRight: 60,
    marginBottom: 30,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 28,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    fontSize: 13,
    lineHeight: 21,
  },
  members: {
    marginLeft: 24,
    marginTop: 28,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: getBottomSpace(),
    color: theme.colors.primary,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-evenly",
  },
  errorTitle: {
    color: theme.colors.heading,
    textAlign: "center",
    fontSize: 22,
    marginBottom: 20,
  },
  errorMessage: {
    color: theme.colors.heading,
    textAlign: "center",
    fontSize: 15,
  },
});
