import { GET_USERS, USERS_LOADING, UPDATE_USERS } from "../actions/types";
const initState = {
  users: [],
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case UPDATE_USERS:
      return Object.assign({}, state, {
        users: state.users.map((user) => {
          return user.name === action.payload.name ? action.payload : user;
        }), // replace matched item and returns the array
      });
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
