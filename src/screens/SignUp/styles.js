import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../config/styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white
  },
  imageWrapper: {
    alignItems: "center"
  },
  icon: {
    height: Dimensions.get("window").width <= 320 ? 78 : 156,
    width: Dimensions.get("window").width <= 320 ? 60 : 120,
    marginTop: "11%"
  },
  iconText: {
    height: 37,
    width: 124,
    marginTop: "4%",
    marginBottom: "8%"
  },
  error: {
    color: colors.coralOrange,
    width: 200,
    textAlign: "center"
  },
  errorWrapper: {
    flex: 1,
    alignItems: "center"
  },
  loadingWrapper: {
    flex: 1,
    alignItems: "center"
  }
});
