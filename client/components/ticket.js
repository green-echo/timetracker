import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {getTicketThunk} from '../store/projects'

const Ticket = (props) => {
  const {ticket} = props

   
    return( <div> <div> {ticket.title}</div>
      <div> {ticket.description}</div>
      <div>{ticket.points}</div>

      </div>

    )
  
}

export default Ticket

// const mapStateToProps = state => {
//   return {
//     data: state.ticket
//   };
// };


// const mapDispatchToProps =  (ticketId)=> {
//     return {
//             getTicket() {
//                 const ticketId = 
//                dispatch(getTicketThunk(ticketId)) 
//             }
//     }
// }


// export default  connect (mapStateToProps , mapDispatchToProps) (Ticket);
