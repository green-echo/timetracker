import axios from 'axios';
import * as ACTIONS from '../actions/action-types';
import history from '../history';

const deleteTicket = ticket => ({
  type: ACTIONS.REMOVE_TICKET,
  ticket
});

export const createTicket = singleTicket => ({
  type: ACTIONS.CREATE_TICKET,
  ticket: singleTicket
});

export const getTickets = payload => ({
  type: ACTIONS.GET_TICKETS,
  payload
});

export const getTicket = singleTicket => ({
  type: ACTIONS.GET_TICKET,
  ticket: singleTicket
});

export const updateTicket = ticket => ({
  type: ACTIONS.UPDATE_TICKET,
  ticket
});

export const getTicketIds = (ids, status) => ({
  type: ACTIONS.GET_TICKET_IDS,
  ids,
  status
});

export const getTicketIdsThunk = (id, status) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/projects/${id}/tickets/${status}`);
      dispatch(getTicketIds(data, status));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createTicketThunk = (ticket, id) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/projects/${id}`, ticket);
      dispatch(createTicket(data));
      history.push(`/projects/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTicketsThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/projects/${id}/tickets/`);
      console.log(data);
      dispatch(getTickets(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTicketThunk = ticketId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/tickets/${ticketId}`);
      dispatch(getTicket(data));
    } catch (err) {
      console.log(err);
    }
  };
};
////////

export const updateTicketThunk = (id, projectId, ticket) => {
  return async dispatch => {
    try {
      console.log('AHHHHHHHHHHHH:', ticket);
      const { data } = await axios.put(`/api/tickets/${id}`, ticket);
      console.log('updated ticket', data);
      dispatch(updateTicket(data));
      // history.push(`/projects/${projectId}`);
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeTicketThunk = ticket => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tickets/${ticket.id}`);
      dispatch(deleteTicket(ticket));
    } catch (err) {
      console.log(err);
    }
  };
};
