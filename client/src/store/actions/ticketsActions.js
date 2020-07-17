import {
  GET_TICKETS,
  TICKETS_LOADING,
  CREATE_TICKET,
  ADD_COMMENT,
  ASSIGN_TICKET,
  UPDATE_TICKET,
  DERIVE_TICKET,
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

export const assignTicket = (ticket) => (dispatch) => {
  axios
    .post("/api/tickets/assign", ticket)
    .then((res) =>
      dispatch({
        type: ASSIGN_TICKET,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ASSIGN_TICKET_FAIL"
        )
      );
    });
};

export const deriveTicket = (ticket) => (dispatch) => {
  axios
    .post("/api/tickets/derive", ticket)
    .then((res) =>
      dispatch({
        type: DERIVE_TICKET,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "DERIVE_TICKET_FAIL"
        )
      );
    });
};

export const updateTicket = (ticket) => (dispatch) => {
  axios
    .post("/api/tickets/update", ticket)
    .then((res) =>
      dispatch({
        type: UPDATE_TICKET,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_TICKET_FAIL"
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
