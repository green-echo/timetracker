import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Ticket from './Ticket';
import { Link } from 'react-router-dom';
import DroppableContainer from './DroppableContainer';
import CreateTicket from './CreateTicket';
import { connect } from 'react-redux';

const Column = ({ tickets, id, activetab }) => {
  const div = {
    minHeight: '50px'
  };

  return (
    <Droppable droppableId={id} style={div}>
      {provided => (
        <Col className={activetab === id ? 'show' : 'hide'}>
          <DroppableContainer provided={provided} innerRef={provided.innerRef}>
            {tickets.map((ticket, index) => {
              return (
                <Draggable
                  draggableId={ticket.id}
                  index={index}
                  key={ticket.id}
                >
                  {provided => (
                    <Ticket
                      provided={provided}
                      innerRef={provided.innerRef}
                      ticket={ticket}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <div style={div} />
          </DroppableContainer>
        </Col>
      )}
    </Droppable>
  );
};

export default Column;
