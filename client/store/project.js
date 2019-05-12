import * as ACTIONS from '../actions/action-types';

const initialState = {
  projects: [],
  project: {},
  users: []
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_PROJECT:
      newState.projects = newState.projects.concat(action.project);
      return newState;
    case ACTIONS.GET_PROJECTS:
      return { ...state, projects: action.projects };
    case ACTIONS.GET_PROJECT:
      return { ...state, project: action.project };
    case ACTIONS.GET_USERS:
      return { ...state, users: action.users };
    case ACTIONS.ADD_USER:
      newState.users = newState.users.concat([action.user]);
    default:
      return state;
  }
}
