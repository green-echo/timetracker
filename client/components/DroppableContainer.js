import React from 'react';

export default class DroppableContainer extends React.Component {
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
