import * as ACTIONS from '../actions/action-types';

const initialState = {
  projects: [],
  project: {},
  users: [],
  projectUsers: []
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_PROJECT:
    newState.projects.push(action.project);
    return newState;
    case ACTIONS.GET_PROJECTS:
      return { ...state, projects: action.projects };
    case ACTIONS.GET_PROJECT:
      return { ...state, project: action.project };
    case ACTIONS.GET_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
}
