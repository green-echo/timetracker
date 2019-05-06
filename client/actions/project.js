import axios from 'axios';
import * as ACTIONS from './action-types';
import history from '../history'

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

export const getProjectUsers = projectUsers => ({
  type: ACTIONS.GET_PROJECT_USERS,
  projectUsers
});

export const addUser = userId => ({
  type: ACTIONS.ADD_USER,
  userId
});

export const createProjectThunk = project => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/projects', project);
      dispatch(createProject(data));
      history.push(`/projects/${data.id}`);
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

export const getUsersThunk = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/projects/${id}/users`);
    dispatch(getUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const getProjectUsersThunk = projectId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/projects/${projectId}/users`);
    dispatch(getProjectUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const addUserThunk = (projectId, userId) => async dispatch => {
  try {
    const { data } = await axios.put(
      `/api/projects/${projectId}/adduser`,
      userId
    );
    dispatch(addUser(data));
  } catch (error) {
    console.error(error);
  }
};
