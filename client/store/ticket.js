/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */

import * as ACTIONS from '../actions/action-types';

const initialState = {
  to_do: [],
  in_progress: [],
  in_review: [],
  done: []
  // toDoTickets: [],
  // inProgressTickets: [],
  // inReviewTickets: [],
  // doneTickets: [],
  // ticket: {},
  // allTickets: []
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_TICKET:
      // newState.allTickets.push(action.ticket);
      newState.to_do.push(action.ticket);
      return newState;
    case ACTIONS.GET_TICKETS:
      // newState.allTickets = action.payload.tickets;
      newState.to_do = action.payload.to_do;
      newState.in_progress = action.payload.in_progress;
      newState.in_review = action.payload.in_review;
      newState.done = action.payload.done;
      console.log(newState);
      return newState;
    case ACTIONS.UPDATE_TICKET:
      // newState.allTickets = newState.allTickets.map(ticket => {
      //   if (ticket.id === action.ticket.id) {
      //     return action.ticket;
      //   } else {
      //     return ticket;
      //   }
      // });

      newState[action.ticket.status] = newState[action.ticket.status].map(
        ticket => {
          if (ticket.id === action.ticket.id) {
            return action.ticket;
          } else {
            return ticket;
          }
        }
      );

      return newState;

    case ACTIONS.REMOVE_TICKET:
      newState[action.ticket.status] = newState[action.ticket.status].filter(
        ticket => ticket.id !== action.ticket.id
      );

      console.log('newState:', newState);
      return newState;
    case ACTIONS.REORDER_TICKET:
      console.log(action.payload);
      const keys = Object.keys(action.payload);
      keys.forEach(key => {
        newState[key] = action.payload[key];
      });
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
