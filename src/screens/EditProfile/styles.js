import { StyleSheet } from "react-native";
import { colors, typography } from "../../config/styles";

export const styles = StyleSheet.create({
  mainContainer: {
    width: "100%"
  },
  background: {
    backgroundColor: colors.white,
    height: "100%"
  },
  profilePhotoButton: {
    marginTop: 30,
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: colors.lightBlue,
    marginRight: 12,
    borderColor: colors.black,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  profileIcon: {
    height: 100,
    width: 100,
    tintColor: "white"
  },
  profilePhoto: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
  profileCircleText: {
    alignSelf: "center",
    fontFamily: typography.fontMain,
    fontSize: 22
  },
  profileEditIcon: {
    marginLeft: 10,
    height: 20,
    width: 20
  },
  textInput: {
    height: 40,
    width: 250,
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderColor: colors.grey,
    borderWidth: 1,
    fontFamily: typography.fontLight
  },
  screenText: {
    fontSize: 18,
    marginRight: 20,
    fontFamily: typography.fontMain
  },
  heading: {
    margin: 15
  },
  workstyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  workstyleIcons: {
    marginHorizontal: 5
  },
  icons: {
    height: 80,
    width: 80
  },
  workstyleText: {
    alignSelf: "center",
    fontFamily: typography.fontLight
  },
  largeInput: {
    minHeight: 120,
    width: 250,
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 10,
    borderRadius: 20,
    borderColor: colors.grey,
    borderWidth: 1,
    alignContent: "flex-start",
    fontFamily: typography.fontLight
  },
  largeInputChips: {
    minHeight: 120,
    width: 250,
    alignSelf: "center",
    borderRadius: 20,
    borderColor: colors.grey,
    borderWidth: 1,
    alignContent: "flex-start"
  }
});
