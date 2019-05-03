import axios from 'axios';

const initialState = {
  toDoTickets: [],
  inProgressTickets: [],
  inReviewTickets: [],
  doneTickets: [],
  ticket: {},
  projects: [],
  currentProject: {}
};

const GET_TICKETS = 'GET_TICKETS';

const REMOVE_TICKET = 'REMOVE_TICKET';

const CREATE_TICKET = 'CREATE_TICKET';

const GET_TICKET = 'GET_TICKET';
const UPDATE_TICKET = 'UPDATE_TICKET';

const CREATE_PROJECT = 'CREATE_PROJECT';
const GET_PROJECTS = 'GET_PROJECTS';

const SET_PROJECT = 'SET_PROJECT';

const removeTicket = ticket => ({
  type: REMOVE_TICKET,
  ticket
});
const createTicket = singleTicket => ({
  type: CREATE_TICKET,
  ticket: singleTicket
});

const createProject = singleProject => ({
  type: CREATE_PROJECT,
  project: singleProject
});

const getTickets = tickets => ({
  type: GET_TICKETS,
  tickets
});

const getProjects = projects => ({
  type: GET_PROJECTS,
  projects
});

const setProject = project => ({
  type: SET_PROJECT,
  currentProject: project
});

const getTicket = singleTicket => ({
  type: GET_TICKET,
  ticket: singleTicket
});

const updateTicket = singleTicket => ({
  type: GET_TICKET,
  ticket: singleTicket
});

export const createTicketThunk = ticket => {
  return async dispatch => {
    try {
      const { data } = await axios.post('api/tickets', ticket);
      dispatch(createTicket(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProjectThunk = project => {
  return async dispatch => {
    try {
      const { data } = await axios.post('api/projects', project);
      console.log('adat', data);
      dispatch(createProject(data));
      dispatch(setProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTicketsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('api/projects/:id/tickets/');
      dispatch(getTickets(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProjectsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('api/projects');
      dispatch(getProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTicketThunk = ticketId => {
  return async dispatch => {
    try {
      const { data } = await axios.get('api/tickets/' + ticketId);
      dispatch(getTicket(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTicketThunk = (id, ticket) => {
  return async dispatch => {
    try {
      const { data } = await axios.put('api/tickets/' + id, ticket);
      dispatch(updateTicket(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeTicketThunk = ticket => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`api/tickets/${ticket.id}`);
      dispatch(removeTicket(ticket.id));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_TICKET:
      newState.toDoTickets.push(action.ticket);
      return newState;
    case GET_TICKETS:
      action.tickets.forEach(ticket => {
        switch (ticket.status) {
          case 'to_do':
            newState.toDoTickets.push(ticket);
            break;
          case 'in_progress':
            newState.inProgressTickets.push(ticket);
            break;
          case 'in_review':
            newState.inReviewTickets.push(ticket);
            break;
          case 'done':
            newState.doneTickets.push(ticket);
            break;
          default:
            break;
        }
      });
      return newState;

    case GET_PROJECTS:
      return { ...state, projects: action.projects };

    case UPDATE_TICKET:
      switch (ticket.status) {
        case 'to_do':
          newState.toDoTickets.map(ticket => {
            if (ticket.id === action.ticket.id) {
              return action.ticket;
            } else {
              return ticket;
            }
          });
          break;
        case 'in_progress':
          newState.inProgressTickets.map(ticket => {
            if (ticket.id === action.ticket.id) {
              return action.ticket;
            } else {
              return ticket;
            }
          });
          break;
        case 'in_review':
          newState.inReviewTickets.map(ticket => {
            if (ticket.id === action.ticket.id) {
              return action.ticket;
            } else {
              return ticket;
            }
          });
          break;
        case 'done':
          newState.doneTickets.map(ticket => {
            if (ticket.id === action.ticket.id) {
              return action.ticket;
            } else {
              return ticket;
            }
          });
          break;
        default:
          break;
      }
      return newState;
    case REMOVE_TICKET:
      switch (ticket.status) {
        case 'to_do':
          newState.toDoTickets.filter(ticket => {
            ticket.id !== action.ticket.id;
          });
          break;
        case 'in_progress':
          newState.inProgressTickets.filter(ticket => {
            ticket.id !== action.ticket.id;
          });
          break;
        case 'in_review':
          newState.inReviewTickets.filter(ticket => {
            ticket.id !== action.ticket.id;
          });
          break;
        case 'done':
          newState.doneTickets.filter(ticket => {
            ticket.id !== action.ticket.id;
          });
          break;
        default:
          break;
      }
      return newState;
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...this.state.projects, action.singleProject]
      };
    case SET_PROJECT:
      return { ...state, currentProject: action.currentProject };
    default:
      return state;
  }
}
