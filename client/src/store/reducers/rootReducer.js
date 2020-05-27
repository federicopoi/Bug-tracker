import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import projectReducer from "./projectReducer";
import ticketReducer from "./ticketReducer";
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  users: usersReducer,
  projects: projectReducer,
  tickets: ticketReducer,
});
