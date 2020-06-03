import { GET_TEAMS, TEAMS_LOADING, CREATE_TEAM, UPDATE_TEAM } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getTeams = () => (dispatch) => {
  dispatch(setTeamsLoading());
  axios
    .get("/api/teams")
    .then((res) =>
      dispatch({
        type: GET_TEAMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createTeam = (team) => (dispatch) => {
  axios
    .post("/api/teams", team)
    .then((res) =>
      dispatch({
        type: CREATE_TEAM,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "CREATE_TEAM_FAIL")
      );
    });
};

export const updateTeam = (team) => (dispatch) => {
  axios
    .post("/api/teams/update", team)
    .then((res) =>
      dispatch({
        type: UPDATE_TEAM,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "UPDATE_TEAM_FAIL")
      );
    });
};

export const setTeamsLoading = () => {
  return {
    type: TEAMS_LOADING,
  };
};
