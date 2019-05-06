/* eslint-disable no-case-declarations */
/* eslint-disable complexity */

import * as ACTIONS from '../actions/action-types';

const initialState = {
  toDoTickets: [],
  inProgressTickets: [],
  inReviewTickets: [],
  doneTickets: [],
  ticket: {},
  allTickets: []
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_TICKET:
      newState.toDoTickets.push(action.ticket);
      return newState;
    case ACTIONS.GET_TICKETS:
      newState.allTickets = action.tickets;
      newState.toDoTickets = action.tickets
        .filter(x => x.status === 'to_do')
        .map(x => x.id);
      newState.inProgressTickets = action.tickets
        .filter(x => x.status === 'in_progress')
        .map(x => x.id);
      newState.inReviewTickets = action.tickets
        .filter(x => x.status === 'in_review')
        .map(x => x.id);
      newState.doneTickets = action.tickets
        .filter(x => x.status === 'done')
        .map(x => x.id);
      return newState;
    case ACTIONS.UPDATE_TICKET:
      switch (action.ticket.status) {
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
    case ACTIONS.REMOVE_TICKET:
      switch (action.ticket.status) {
        case 'to_do':
          newState.toDoTickets.filter(ticket => ticket.id !== action.ticket.id);
          break;
        case 'in_progress':
          newState.inProgressTickets.filter(
            ticket => ticket.id !== action.ticket.id
          );
          break;
        case 'in_review':
          newState.inReviewTickets.filter(
            ticket => ticket.id !== action.ticket.id
          );
          break;
        case 'done':
          newState.doneTickets.filter(ticket => ticket.id !== action.ticket.id);
          break;
        default:
          break;
      }
      return newState;
    case ACTIONS.GET_TICKET_IDS:
      switch (action.status) {
        case 'to_do':
          newState.toDoTickets = action.ids;
          break;
        case 'in_progress':
          newState.inProgressTickets = action.ids;
          break;
        case 'in_review':
          newState.inReviewTickets = action.ids;
          break;
        case 'done':
          newState.doneTickets = action.ids;
          break;
        default:
          break;
      }
      return newState;
    default:
      return state;
  }
}
