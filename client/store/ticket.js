import axios from 'axios';

import * as ACTIONS from '../actions/action-types';

const initialState = {
  toDoTickets: [],
  inProgressTickets: [],
  inReviewTickets: [],
  doneTickets: [],
  ticket: {}
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_TICKET:
      newState.toDoTickets.push(action.ticket);
      return newState;
    case ACTIONS.GET_TICKETS:
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
    case ACTIONS.UPDATE_TICKET:
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
    case ACTIONS.REMOVE_TICKET:
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
    default:
      return state;
  }
}
