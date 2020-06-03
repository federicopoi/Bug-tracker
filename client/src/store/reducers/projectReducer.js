import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  CREATE_PROJECT,
  UPDATE_PROJECT,
} from "../actions/types";
const initState = {
  projects: [],
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: [action.payload],
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
