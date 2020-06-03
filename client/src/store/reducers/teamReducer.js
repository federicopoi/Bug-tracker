import {
  GET_TEAMS,
  TEAMS_LOADING,
  CREATE_TEAM,
  UPDATE_TEAM,
} from "../actions/types";
const initState = {
  teams: [],
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        loading: false,
      };
    case CREATE_TEAM:
      return {
        ...state,
        teams: [action.payload, ...state.teams],
      };
    case UPDATE_TEAM:
      return {
        ...state,
        teams: [action.payload],
      };
    case TEAMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
