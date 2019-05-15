import axios from 'axios';
import * as ACTIONS from '../actions/action-types';
import history from '../history';
import socket from '../socket';

export const reorderTickets = payload => ({
  type: ACTIONS.REORDER_TICKETS,
  payload
});

export const deleteTicket = ticket => ({
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

export const addUserToTicket = userId => ({
  type: ACTIONS.ADD_USER_TO_TICKET,
  userId
});

export const createTicketThunk = (ticket, id) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/projects/${id}`, ticket);
      dispatch(createTicket(data));
      socket.emit('new ticket', id, data);
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
      const { data: updatedTicket } = await axios.put(
        `/api/tickets/${id}`,
        ticket
      );

      dispatch(updateTicket(updatedTicket));

      socket.emit('modify', projectId, {
        id: updatedTicket.id,
        title: updatedTicket.title,
        description: updatedTicket.description
      });

      socket.emit('update ticket', projectId, updatedTicket);

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
      socket.emit('remove ticket', ticket.projectId, ticket);
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUserToTicketThunk = (ticketId, userId) => async dispatch => {
  try {
    const { data: result } = await axios.put(
      `/api/tickets/${ticketId}/adduser`,
      { userId: userId }
    );
    socket.emit('modify', result.ticket.projectId, {
      id: result.ticket.id,
      userId,
      userEmail: result.userEmail
    });
    socket.emit('update ticket', result.ticket.projectId, result.ticket);
  } catch (error) {
    console.error(error);
  }
};

export const removeUserFromTicketThunk = (
  ticketId,
  projectId
) => async dispatch => {
  try {
    const { data: updatedTicket } = await axios.put(
      `/api/tickets/${ticketId}/removeuser`
    );
    socket.emit('modify', projectId, {
      id: ticketId,
      userEmail: 'Select User'
    });
    socket.emit('update ticket', projectId, updatedTicket);
  } catch (error) {
    console.error(error);
  }
};
