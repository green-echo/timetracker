import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Ticket from './ticket-ph';
import StatusColumn from './status-column';

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
export default class ProjectBoard extends React.Component {
  onDragEnd = result => {};
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container className="project-board">
          <Row>
            <Col>Project Name</Col>
          </Row>
          <Row className="board-header">
            <Col>To Do</Col>
            <Col>In Progress</Col>
            <Col>In Review</Col>
            <Col>Done</Col>
          </Row>
          <Row className="board-container">
            <Droppable droppableId="1">
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {inProgressTickets.map(ticket => {
                      return (
                        <Draggable draggableId={ticket.id} index={ticket.id}>
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
                  </StatusColumn>
                </Col>
              )}
            </Droppable>
            <Droppable droppableId="2">
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {inProgressTickets.map(ticket => {
                      return (
                        <Draggable draggableId={ticket.id} index={ticket.id}>
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
                  </StatusColumn>
                </Col>
              )}
            </Droppable>
            <Droppable droppableId="3">
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {inProgressTickets.map(ticket => {
                      return (
                        <Draggable draggableId={ticket.id} index={ticket.id}>
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
                  </StatusColumn>
                </Col>
              )}
            </Droppable>
            <Droppable droppableId="4">
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {inProgressTickets.map(ticket => {
                      return (
                        <Draggable draggableId={ticket.id} index={ticket.id}>
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
                  </StatusColumn>
                </Col>
              )}
            </Droppable>
          </Row>
        </Container>
      </DragDropContext>
    );
  }
}
