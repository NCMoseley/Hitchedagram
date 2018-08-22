// import { AsyncStorage } from "react-native";
// import { firebaseDB } from "../../config/firebaseConfig";
// import { updateUserProfile } from "../../helpers/firebaseAuth";
// import { updateProfilePic } from "../../helpers/uploadProfilePicHelper";
// import { updateWorkstyle } from "../../helpers/firebaseStore";

// const GET_USER_LOADING = "GET_USER_LOADING";
// const GET_USER_SCORE = "GET_USER_SCORE";
// const GET_USER_WORKSTYLE = "GET_USER_WORKSTYLE";
// const GET_USER = "GET_USER";
// const GET_USERS = "GET_USERS";
// const GET_USER_ERROR = "GET_USER_ERROR";
// const GET_UPDATE_USER = "GET_UPDATE_USER";
// const RESET_USER = "RESET_USER";

// const SET_FULLNAME = "SET_FULLNAME";
// const SET_PROGRAM = "SET_PROGRAM";
// const SET_SCHOOL_NAME = "SET_SCHOOL_NAME";
// const SET_ABOUT_ME = "SET_ABOUT_ME";
// const SET_WORKSTYLE = "SET_WORKSTYLE";
// const SET_CHIPS = "SET_CHIPS";
// const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";

// export const setFullName = fullName => ({
//   type: SET_FULLNAME,
//   payload: fullName
// });

// export const setProgram = program => ({
//   type: SET_PROGRAM,
//   payload: program
// });

// export const setSchoolName = schoolName => ({
//   type: SET_SCHOOL_NAME,
//   payload: schoolName
// });

// export const setAboutMe = aboutMe => ({
//   type: SET_ABOUT_ME,
//   payload: aboutMe
// });

// export const setChips = chips => ({
//   type: SET_CHIPS,
//   payload: chips
// });

// export const setWorkstyle = workstyle => ({
//   type: SET_WORKSTYLE,
//   payload: workstyle
// });

// export const setProfilePhoto = profilePhoto => ({
//   type: SET_PROFILE_PHOTO,
//   payload: profilePhoto
// });

// const getUserLoading = () => ({
//   type: GET_USER_LOADING
// });

// export const getUserScore = ([fun, grow, win]) => ({
//   type: GET_USER_SCORE,
//   payload: [fun, grow, win]
// });

// const getUserWorkstyle = workstyle => ({
//   type: GET_USER_WORKSTYLE,
//   payload: workstyle
// });

// export const getUser = user => ({
//   type: GET_USER,
//   payload: user
// });

// const getUsers = user => ({
//   type: GET_USERS,
//   payload: user
// });

// export const getUserError = err => ({
//   type: GET_USER_ERROR,
//   payload: err
// });

// const updateUser = updatedUser => ({
//   type: GET_UPDATE_USER,
//   payload: updatedUser
// });
// export const resetUser = () => ({
//   type: RESET_USER
// });

// export const updateProfileOnEdit = ({
//   fullname,
//   program,
//   schoolName,
//   aboutMe,
//   workstyle,
//   profilePhoto,
//   chips
// }) => async dispatch => {
//   dispatch(getUserLoading());
//   try {
//     await updateUserProfile(fullname, program, schoolName, aboutMe, chips);
//     await updateProfilePic(profilePhoto);
//     await updateWorkstyle(workstyle);
//     dispatch(
//       updateUser({
//         fullname,
//         program,
//         schoolName,
//         aboutMe,
//         workstyle,
//         profilePhoto,
//         chips
//       })
//     );
//   } catch (err) {
//     dispatch(getUserError(err));
//   }
// };

// export const fetchUserWorkstyle = () => async dispatch => {
//   dispatch(getUserLoading());
//   const uid = await AsyncStorage.getItem("user");
//   const userQuery = firebaseDB.collection("users").doc(uid);
//   await userQuery
//     .get()
//     .then(doc => {
//       dispatch(getUserWorkstyle(doc.data().workstyle));
//     })
//     .catch(err => dispatch(getUserError(err)));
// };

// export const fetchUser = () => async dispatch => {
//   dispatch(getUserLoading());
//   const uid = await AsyncStorage.getItem("user");
//   const userQuery = firebaseDB.collection("users").doc(uid);
//   await userQuery
//     .get()
//     .then(doc => {
//       dispatch(getUser(doc.data()));
//     })
//     .catch(err => dispatch(getUserError(err)));
// };

// export const fetchOtherUser = uid => async dispatch => {
//   dispatch(getUserLoading());
//   const userQuery = firebaseDB.collection("users").doc(uid);
//   await userQuery
//     .get()
//     .then(doc => {
//       dispatch(getUsers(doc.data()));
//     })
//     .catch(err => dispatch(getUserError(err)));
// };
// const initialState = {
//   isLoading: false,
//   score: [],
//   workstyle: "",
//   user: {
//     chips: []
//   },
//   userForm: {
//     fullname: "",
//     program: "",
//     schoolName: "",
//     aboutMe: "",
//     workstyle: "",
//     profilePhoto: "",
//     chips: []
//   },
//   users: {},
//   error: ""
// };
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case GET_USER_LOADING:
//       return {
//         ...state,
//         isLoading: true,
//         error: ""
//       };
//     case GET_USER_SCORE:
//       return {
//         ...state,
//         score: action.payload,
//         error: ""
//       };
//     case GET_USER_WORKSTYLE:
//       return {
//         ...state,
//         workstyle: action.payload,
//         error: ""
//       };
//     case GET_USER:
//       return {
//         ...state,
//         user: action.payload,
//         userForm: { ...state.userForm, ...action.payload },
//         isLoading: false,
//         error: ""
//       };
//     case GET_USERS:
//       return {
//         ...state,
//         users: {
//           ...state.users,
//           [action.payload.uid]: action.payload
//         },
//         isLoading: false
//       };
//     case GET_USER_ERROR:
//       return {
//         ...state,
//         error: action.payload.message,
//         isLoading: false
//       };
//     case GET_UPDATE_USER:
//       return {
//         ...state,
//         user: {
//           ...state.user,
//           ...action.payload
//         },
//         isLoading: false
//       };
//     case SET_FULLNAME:
//       return {
//         ...state,
//         userForm: { ...state.userForm, fullname: action.payload }
//       };
//     case SET_PROGRAM:
//       return {
//         ...state,
//         userForm: { ...state.userForm, program: action.payload }
//       };
//     case SET_SCHOOL_NAME:
//       return {
//         ...state,
//         userForm: { ...state.userForm, schoolName: action.payload }
//       };
//     case SET_ABOUT_ME:
//       return {
//         ...state,
//         userForm: { ...state.userForm, aboutMe: action.payload }
//       };
//     case SET_WORKSTYLE:
//       return {
//         ...state,
//         userForm: { ...state.userForm, workstyle: action.payload }
//       };
//     case SET_CHIPS:
//       return {
//         ...state,
//         userForm: { ...state.userForm, chips: action.payload }
//       };
//     case SET_PROFILE_PHOTO:
//       return {
//         ...state,
//         userForm: { ...state.userForm, profilePhoto: action.payload }
//       };
//     case RESET_USER:
//       return initialState;

//     default:
//       return state;
//   }
// };
