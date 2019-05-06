import * as ACTIONS from '../actions/action-types';

const initialState = {
  projects: [],
  project: {}
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
    default:
      return state;
  }
}
