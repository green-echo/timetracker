import axios from 'axios';
import * as ACTIONS from './action-types';
import history from '../history';
import socket from '../socket';
import { d3DataObject } from '../utils';

export const getProjectTickets = payload => ({
  type: ACTIONS.GET_PROJECT_TICKETS,
  payload
});
export const getProjectTicketsThunk = () => {
  return async dispatch => {
    try {
      const { data: tickets } = await axios.get(`/api/projects/user/tickets`);
      let formatedData = d3DataObject(tickets);
      console.log('formatedData', formatedData);
      dispatch(getProjectTickets(formatedData));
    } catch (error) {
      console.log(error);
    }
  };
};
