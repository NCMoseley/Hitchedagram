// // import { firebaseDB } from "../../config/firebaseConfig";
// // import { competitionValidation } from "../../helpers/timestampHelpers";

// // Action types
// const GET_COMPETITION_LOADING = 'GET_COMPETITION_LOADING';
// const GET_COMPETITION = 'GET_COMPETITION';
// const GET_COMPETITION_ERROR = 'GET_COMPETITION_ERROR';
// const RESET_COMPS = 'RESET_COMPS';

// // Action creators
// const getCompetitionLoading = () => ({
//   type: GET_COMPETITION_LOADING
// });

// const getCompetitionError = err => ({
//   type: GET_COMPETITION_ERROR,
//   payload: err
// });

// const getCompetition = competitions => ({
//   type: GET_COMPETITION,
//   payload: competitions
// });
// export const resetComps = () => ({
//   type: RESET_COMPS
// });

// // Async action creator
// export const fetchCompetitions = param => dispatch => {
//   dispatch(getCompetitionLoading());
//   const query = param
//     ? firebaseDB.collection('competitions').where('category', '==', param)
//     : firebaseDB.collection('competitions');
//   query
//     .get()
//     .then(snapshot => {
//       snapshot.forEach(competition => {
//         if (competitionValidation(competition.data().startTime)) {
//           const data = competition.data();
//           data.id = competition.id;
//           dispatch(getCompetition(data));
//         }
//       });
//     })
//     .catch(err => dispatch(getCompetitionError(err)));
// };
// const intitialState = { isLoading: false, competitions: {}, error: '' };
// // Reducer
// export default (state = intitialState, action) => {
//   switch (action.type) {
//     case GET_COMPETITION_LOADING:
//       return {
//         ...state,
//         isLoading: true,
//         error: ''
//       };
//     case GET_COMPETITION:
//       return {
//         ...state,
//         isLoading: false,
//         competitions: {
//           ...state.competitions,
//           [action.payload.id]: action.payload
//         },
//         error: ''
//       };
//     case GET_COMPETITION_ERROR:
//       return {
//         ...state,
//         error: action.payload.message
//       };
//     case RESET_COMPS:
//       return intitialState;
//     default:
//       return state;
//   }
// };
