import {
  GET_TICKETS,
  TICKETS_LOADING,
  CREATE_TICKET,
  ADD_COMMENT,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getTickets = () => (dispatch) => {
  dispatch(setTicketsLoading());
  axios
    .get("/api/tickets")
    .then((res) =>
      dispatch({
        type: GET_TICKETS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createTicket = (ticket) => (dispatch) => {
  axios
    .post("/api/tickets", ticket)
    .then((res) =>
      dispatch({
        type: CREATE_TICKET,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CREATE_TICKET_FAIL"
        )
      );
    });
};

export const addComment = (comment) => (dispatch) => {
  axios
    .post("/api/tickets/addcomment", comment)
    .then((res) =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setTicketsLoading = () => {
  return {
    type: TICKETS_LOADING,
  };
};
