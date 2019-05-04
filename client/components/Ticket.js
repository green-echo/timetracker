import React, { Component } from 'react';

class Ticket extends Component {
  render() {
    const { provided, innerRef, ticket } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <div>{ticket.title}</div>
        <div>{ticket.description}</div>
        <div>{ticket.points}</div>
        {ticket.userId && <div>Assigned To: {ticket.currentUserEmail}</div>}
      </div>
    );
  }
}

export default Ticket;
