import { combineReducers } from 'redux';

// import competitiionReducer from "./modules/competition";
// import matchScreenLoadingReducer from "./modules/matchScreenLoading";
// // import teamsReducer from "./modules/teams/";
import userReducer from './modules/user';

const rootReducer = combineReducers({
  // competition: competitiionReducer,
  // matchScreenLoading: matchScreenLoadingReducer,
  // teams: teamsReducer,
  user: userReducer
});

export default rootReducer;
