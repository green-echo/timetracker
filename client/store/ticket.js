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
      newState.allTickets.push(action.ticket);
      newState.toDoTickets.push(action.ticket.id);
      return newState;
    case ACTIONS.GET_TICKETS:
      newState.allTickets = action.payload.tickets;
      newState.toDoTickets = action.payload.toDo || [];
      newState.inProgressTickets = action.payload.inProgress || [];
      newState.inReviewTickets = action.payload.inReview || [];
      newState.doneTickets = action.payload.done || [];
      return newState;

    case ACTIONS.UPDATE_TICKET:
      newState.allTickets = newState.allTickets.map(ticket => {
        if (ticket.id === action.ticket.id) {
          return action.ticket;
        } else {
          return ticket;
        }
      });
      return newState;

    case ACTIONS.REMOVE_TICKET:
      console.log('TICKET:', action.ticket);
      newState.allTickets = newState.allTickets.filter(
        ticket => ticket.id !== action.ticket.id
      );

      switch (action.ticket.status) {
        case 'to_do':
          newState.toDoTickets = newState.toDoTickets.filter(
            id => id !== action.ticket.id
          );
          break;
        case 'in_progress':
          newState.inProgressTickets = newState.inProgressTickets.filter(
            id => id !== action.ticket.id
          );
          break;
        case 'in_review':
          newState.inReviewTickets = newState.inReviewTickets.filter(
            id => id !== action.ticket.id
          );
          break;
        case 'done':
          newState.doneTickets = newState.doneTickets.filter(
            id => id !== action.ticket.id
          );
          break;
        default:
          break;
      }
      console.log('newState:', newState);
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
