/* eslint-disable no-case-declarations */
/* eslint-disable complexity */

import * as ACTIONS from '../actions/action-types';

const initialState = {
  to_do: [],
  in_progress: [],
  in_review: [],
  done: [],
  ticket: {},
  allTickets: []
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_TICKET:
      newState.allTickets.push(action.ticket);
      newState.to_do.push(action.ticket.id);
      return newState;
    case ACTIONS.GET_TICKETS:
      newState.allTickets = action.payload.tickets;
      newState.to_do = action.payload.to_do.map(x => x.id);
      newState.in_progress = action.payload.in_progress.map(x => x.id);
      newState.in_review = action.payload.in_review.map(x => x.id);
      newState.done = action.payload.done.map(x => x.id);
      console.log(newState);
      return newState;

    case ACTIONS.UPDATE_TICKET:
      newState.allTickets = newState.allTickets.map(ticket => {
        if (ticket.id === action.ticket.id) {
          return action.ticket;
        } else {
          return ticket;
        }
      });
      newState.ticket = action.ticket;
      return newState;

    case ACTIONS.REMOVE_TICKET:
      console.log('TICKET:', action.ticket);
      console.log(newState);
      newState.allTickets = newState.allTickets.filter(
        ticket => ticket.id !== action.ticket.id
      );

      newState[action.ticket.status] = newState[action.ticket.status].filter(
        id => id !== action.ticket.id
      );

      console.log('newState:', newState);
      return newState;
    default:
      return state;
  }
}
