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
        {ticket.title}
      </div>
    );
  }
}

export default Ticket;
