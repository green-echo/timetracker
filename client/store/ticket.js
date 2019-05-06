/* eslint-disable complexity */
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
      if (action.ticket.status === 'to_do') {
        return {
          ...state,
          toDoTickets: state.toDoTickets.filter(
            ticket => ticket.id !== action.ticket.id
          )
        };
      } else if (action.ticket.status === 'in_progress') {
        return {
          ...state,
          inProgressTickets: state.inProgressTickets.filter(
            ticket => ticket.id !== action.ticket.id
          )
        };
      } else if (action.ticket.status === 'in_review') {
        return {
          ...state,
          inReviewTickets: state.inReviewTickets.filter(
            ticket => ticket.id !== action.ticket.id
          )
        };
      } else if (action.ticket.status === 'done') {
        return {
          ...state,
          doneTickets: state.doneTickets.filter(
            ticket => ticket.id !== action.ticket.id
          )
        };
      }
    case ACTIONS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
      } = action.payload;
      //in the same list
      if (droppableIdStart === droppableIdEnd) {
        if (droppableIdStart === '1') {
          const card1 = newState.toDoTickets.splice(droppableIndexStart, 1);
          newState.toDoTickets.splice(droppableIndexEnd, 0, ...card1);
        } else if (droppableIdStart === '2') {
          const card2 = newState.inProgressTickets.splice(
            droppableIndexStart,
            1
          );
          newState.inProgressTickets.splice(droppableIndexEnd, 0, ...card2);
        } else if (droppableIdStart === '3') {
          const card3 = newState.inReviewTickets.splice(droppableIndexStart, 1);
          newState.inReviewTickets.splice(droppableIndexEnd, 0, ...card3);
        } else if (droppableIdStart === '4') {
          const card4 = newState.doneTickets.splice(droppableIndexStart, 1);
          newState.doneTickets.splice(droppableIndexEnd, 0, ...card4);
        }
      }
      //moving to another list
      if (droppableIdStart !== droppableIdEnd) {
        if (droppableIdStart === '1') {
          const card = newState.toDoTickets.splice(droppableIndexStart, 1);
          if (droppableIdEnd === '2') {
            card.map(elem => (elem.status = 'in_progress'));
            newState.inProgressTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '3') {
            card.forEach(elem => (elem.status = 'in_review'));
            newState.inReviewTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '4') {
            card.forEach(elem => (elem.status = 'done'));
            newState.doneTickets.splice(droppableIndexEnd, 0, ...card);
          }
        } else if (droppableIdStart === '2') {
          const card = newState.inProgressTickets.splice(
            droppableIndexStart,
            1
          );
          if (droppableIdEnd === '1') {
            card.forEach(elem => (elem.status = 'to_do'));
            newState.toDoTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '3') {
            card.forEach(elem => (elem.status = 'in_review'));
            newState.inReviewTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '4') {
            card.forEach(elem => (elem.status = 'done'));
            newState.doneTickets.splice(droppableIndexEnd, 0, ...card);
          }
        } else if (droppableIdStart === '3') {
          const card = newState.inReviewTickets.splice(droppableIndexStart, 1);
          if (droppableIdEnd === '1') {
            card.forEach(elem => {
              elem.status = 'to_do';
            });
            newState.toDoTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '2') {
            card.forEach(elem => (elem.status = 'in_progress'));
            newState.inProgressTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '4') {
            card.forEach(elem => (elem.status = 'done'));
            newState.doneTickets.splice(droppableIndexEnd, 0, ...card);
          }
        } else if (droppableIdStart === '4') {
          const card = newState.doneTickets.splice(droppableIndexStart, 1);
          if (droppableIdEnd === '1') {
            card.forEach(elem => (elem.status = 'to_do'));
            newState.toDoTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '2') {
            card.forEach(elem => (elem.status = 'in_progress'));
            newState.inProgressTickets.splice(droppableIndexEnd, 0, ...card);
          } else if (droppableIdEnd === '3') {
            card.forEach(elem => (elem.status = 'in_review'));
            newState.inReviewTickets.splice(droppableIndexEnd, 0, ...card);
          }
        }
      }
      return newState;
    default:
      return state;
  }
}
