// import { AsyncStorage } from "react-native";

// import { firebaseDB } from "../../config/firebaseConfig";
// import {
//   teamType,
//   teamName,
//   similarTeamType,
//   findBestMatch,
//   generateQuery,
//   filterOtherMatches
// } from "../../helpers/matchingHelpers";

// // Action types
// const GET_TEAM_BEST_MATCH = "GET_TEAM_BEST_MATCH";
// const GET_TEAM_OTHER_MATCHES = "GET_TEAM_OTHER_MATCHES";
// const GET_TEAM_RESET = "GET_TEAM_RESET";
// const GET_TEAM_LOADING = "GET_TEAM_LOADING";
// const GET_TEAM_ERROR = "GET_TEAM_ERROR";
// const GET_TEAM_TEMP_DATA = "GET_TEAM_TEMP_DATA";
// const RESET_TEAM = "RESET_TEAM";
// // Action creators
// const getTeamBestMatch = match => ({
//   type: GET_TEAM_BEST_MATCH,
//   payload: match
// });
// const getTeamOtherMatches = otherMatches => ({
//   type: GET_TEAM_OTHER_MATCHES,
//   payload: otherMatches
// });
// const getTeamError = error => ({
//   type: GET_TEAM_ERROR,
//   payload: error.message
// });
// const getTeamLoading = () => ({
//   type: GET_TEAM_LOADING
// });
// const getTeamTempData = data => ({
//   type: GET_TEAM_TEMP_DATA,
//   payload: data
// });

// export const resetTeam = () => ({
//   type: RESET_TEAM
// });

// export const getTeamReset = () => ({
//   type: GET_TEAM_RESET
// });

// // Async action creators
// // Async action to fetch best match to user
// export const fetchBestMatch = (
//   workstyle,
//   score,
//   competitionId,
//   teamSize
// ) => async dispatch => {
//   dispatch(getTeamReset());
//   dispatch(getTeamLoading());

//   const type = teamType(...score);
//   const teams = {};

//   const teamsQuery = generateQuery("teams", competitionId, workstyle, type);

//   try {
//     await teamsQuery.get().then(snapshot => {
//       if (!snapshot.empty) {
//         snapshot.forEach(team => {
//           teams[team.id] = team.data();
//         });
//       }
//     });

//     if (Object.keys(teams).length) {
//       const { match, otherMatches } = findBestMatch(teams);
//       dispatch(getTeamBestMatch(match));
//       dispatch(getTeamOtherMatches(otherMatches));
//     } else {
//       // if there's no match with the user type, fetch similar type teams
//       const rematch = await dispatch(
//         fetchOtherMatches(workstyle, score, competitionId, true)
//       );
//       const result = findBestMatch(rematch);

//       if (result.match !== undefined) {
//         dispatch(getTeamBestMatch(result.match));
//         dispatch(getTeamOtherMatches(result.otherMatches));
//       } else {
//         // if there is no match for other types either, reset bestMatch and otherMatches
//         dispatch(
//           getTeamTempData({
//             workstyle,
//             type,
//             competitionId,
//             teamSize,
//             score
//           })
//         );
//         dispatch(getTeamReset());
//       }
//     }
//   } catch (err) {
//     dispatch(getTeamError(err));
//   }
// };

// // Async action to fetch other matches when user clicks "browse other groups"
// // @param: user workstyle, score[fun, grow, win], competition id and flag true for refetch if no best match exists
// export const fetchOtherMatches = (
//   workstyle,
//   score,
//   competitionId,
//   flag
// ) => async dispatch => {
//   dispatch(getTeamLoading());

//   const [typeOne, typeTwo] = similarTeamType(...score);
//   const matches = {};

//   const teamsQueryOne = generateQuery(
//     "teams",
//     competitionId,
//     workstyle,
//     typeOne
//   );

//   const teamsQueryTwo = generateQuery(
//     "teams",
//     competitionId,
//     workstyle,
//     typeTwo
//   );

//   try {
//     await teamsQueryOne.get().then(snapshot =>
//       snapshot.forEach(team => {
//         const newMatch = team.data();
//         if (
//           team.users &&
//           filterOtherMatches(score, Object.values(team.users))
//         ) {
//           newMatch.id = team.id;
//           matches[team.id] = newMatch;
//         }
//       })
//     );

//     await teamsQueryTwo.get().then(snapshot =>
//       snapshot.forEach(team => {
//         const newMatch = team.data();
//         if (
//           team.users &&
//           filterOtherMatches(score, Object.values(team.users))
//         ) {
//           newMatch.id = team.id;
//           matches[team.id] = newMatch;
//         }
//       })
//     );
//     if (flag) {
//       return matches;
//     } else {
//       const result = Object.values(matches);
//       dispatch(getTeamOtherMatches(result));
//     }
//   } catch (error) {
//     dispatch(getTeamError(error));
//   }
// };

// // Async action to create new team for user when there is no match
// // and add competitionId to user
// export const createTeamAndAddUser = (
//   workstyle,
//   type,
//   competitionId,
//   teamSize,
//   score
// ) => async dispatch => {
//   try {
//     const uid = await AsyncStorage.getItem("user");
//     let teamId = "";
//     await firebaseDB
//       .collection("teams")
//       .add({
//         workstyle,
//         type,
//         competitionId,
//         teamSize,
//         users: {
//           [uid]: { fun: score[0], grow: score[1], win: score[2], id: uid }
//         }
//       })
//       .then(async docRef => {
//         // Refetch newly added team, which is a perfect match :)
//         teamId = docRef.id;
//         const newTeam = await docRef.get();
//         dispatch(getTeamBestMatch(newTeam.data()));
//         dispatch(getTeamTempData({}));
//       });

//     // Add competitionIds and teamIds to user
//     firebaseDB
//       .collection("users")
//       .doc(uid)
//       .set(
//         {
//           competitions: {
//             [competitionId]: true
//           },
//           teams: {
//             [teamId]: true
//           }
//         },
//         { merge: true }
//       );
//   } catch (error) {
//     dispatch(getTeamError(error));
//   }
// };

// // Async action to add user to team when there is pre-existing team
// // Also add teamid and competitionid to user collection
// export const addUserToTeam = (
//   score,
//   teamId,
//   competitionId,
//   userId
// ) => async dispatch => {
//   try {
//     console.log(userId);
//     const teamRef = firebaseDB.collection("teams").doc(teamId);
//     const users = await teamRef.get().then(snapshot => snapshot.data().users);
//     users[userId] = {
//       fun: score[0],
//       grow: score[1],
//       win: score[2],
//       id: userId
//     };
//     await teamRef.update({
//       users: users
//     });

//     firebaseDB
//       .collection("users")
//       .doc(userId)
//       .set(
//         {
//           competitions: {
//             [competitionId]: true
//           },
//           teams: {
//             [teamId]: true
//           }
//         },
//         { merge: true }
//       );
//   } catch (error) {
//     dispatch(getTeamError(error));
//   }
// };

// // Async action to remove user from the team
// export const removeUserFromTeam = async (
//   teamId,
//   competitionId,
//   userId
// ) => async dispatch => {
//   const teamRef = firebaseDB.collection("teams").doc(teamId);
//   const userRef = firebaseDB.collection("users").doc(userId);

//   try {
//     const users = await teamRef.get().then(snapshot => snapshot.data().users);
//     const { competitions, teams } = await userRef
//       .get()
//       .then(snapshot => snapshot.data());

//     delete users[userId];
//     delete competitions[competitionId];
//     delete teams[teamId];

//     if (users === {}) {
//       teamRef.delete();
//     } else {
//       teamRef.update({
//         users: users
//       });
//       userRef.updata({
//         competitions: competitions,
//         teams: teams
//       });
//     }
//   } catch (error) {
//     dispatch(getTeamError(error));
//   }
// };

// const intitialState = {
//   isLoading: false,
//   bestMatch: { users: {} },
//   otherMatches: [],
//   error: "",
//   tempData: {},
//   noMatch: false
// };
// // Reducer
// export default (state = intitialState, action) => {
//   switch (action.type) {
//     case GET_TEAM_LOADING:
//       return {
//         ...state,
//         isLoading: true
//       };
//     case GET_TEAM_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//         isLoading: false,
//         noMatch: false
//       };
//     case GET_TEAM_BEST_MATCH:
//       return {
//         ...state,
//         bestMatch: action.payload,
//         isLoading: false,
//         error: "",
//         noMatch: false
//       };
//     case GET_TEAM_OTHER_MATCHES:
//       return {
//         ...state,
//         isLoading: false,
//         otherMatches: state.otherMatches.concat(action.payload),
//         error: "",
//         noMatch: false
//       };
//     case GET_TEAM_TEMP_DATA:
//       return {
//         ...state,
//         tempData: action.payload,
//         noMatch: true,
//         isLoading: false
//       };
//     case GET_TEAM_RESET:
//       return {
//         ...state,
//         bestMatch: {},
//         otherMatches: []
//       };
//     case RESET_TEAM:
//       return intitialState;
//     default:
//       return state;
//   }
// };
