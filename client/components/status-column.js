import React from 'react';
const inProgressTickets = [
  {
    id: 1,
    title: 'create nav',
    desc: 'idk',
    points: 1,
    status: 'in progress'
  },
  {
    id: 2,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in progress'
  }
];

export default class StatusColumn extends React.Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div
        {...provided.droppableProps}
        ref={innerRef}
        style={{ height: '100%' }}
      >
        {children}
      </div>
    );
  }
}
