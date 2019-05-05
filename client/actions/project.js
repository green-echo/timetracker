import axios from 'axios';
import * as ACTIONS from './action-types';

export const getProjects = projects => ({
  type: ACTIONS.GET_PROJECTS,
  projects
});
export const getProject = project => ({
  type: ACTIONS.GET_PROJECT,
  project
});

export const createProject = singleProject => ({
  type: ACTIONS.CREATE_PROJECT,
  project: singleProject
});

export const getUsers = users => ({
  type: ACTIONS.GET_USERS,
  users
});
export const createProjectThunk = project => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/projects', project);
      dispatch(createProject(data));
      dispatch(getProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProjectsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/projects');
      dispatch(getProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProjectThunk = projectId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/projects/${projectId}`);
      dispatch(getProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUsersThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users');
    dispatch(getUsers(data));
  } catch (error) {
    console.error(error);
  }
};
