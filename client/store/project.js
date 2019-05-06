import * as ACTIONS from '../actions/action-types';

const initialState = {
  projects: [],
  project: {}
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_PROJECT:
      return {
        ...state,
        projects: [...this.state.projects, action.singleProject]
      };
    case ACTIONS.GET_PROJECTS:
      return { ...state, projects: action.projects };
    case ACTIONS.GET_PROJECT:
      return { ...state, project: action.project };
    default:
      return state;
  }
}
