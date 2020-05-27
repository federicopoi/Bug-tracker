import { GET_USERS, USERS_LOADING, UPDATE_USERS } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateUsersRole = (user) => (dispatch) => {
  axios
    .post("/api/users/update", user)
    .then((res) =>
      dispatch({
        type: UPDATE_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
