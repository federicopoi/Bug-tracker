import {
  GET_TICKETS,
  TICKETS_LOADING,
  CREATE_TICKET,
  ADD_COMMENT,
  ASSIGN_TICKET,
  UPDATE_TICKET,
  DERIVE_TICKET,
} from "../actions/types";
const initState = {
  tickets: [],
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false,
      };
    case CREATE_TICKET:
    case ASSIGN_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
      };
    case ADD_COMMENT:
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: [action.payload],
      };

    case DERIVE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case TICKETS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
