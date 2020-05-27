import { GET_PROJECTS, PROJECTS_LOADING, CREATE_PROJECT } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getProjects = () => (dispatch) => {
  dispatch(setProjectsLoading());
  axios
    .get("/api/projects")
    .then((res) =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createProject = (project) => (dispatch) => {
  axios
    .post("/api/projects", project)
    .then((res) =>
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CREATE_PROJECT_FAIL"
        )
      );
    });
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
