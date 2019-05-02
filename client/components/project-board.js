import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Ticket from './ticket';
import StatusColumn from './status-column';
const tickets = {
  '1': {
    id: 1,
    title: 'create User',
    desc: 'idk',
    points: 1,
    status: 'to do'
  },
  '2': {
    id: 2,
    title: 'create footer',
    desc: 'idk2',
    points: 4,
    status: 'to do'
  },
  '3': {
    id: 3,
    title: 'create nav',
    desc: 'idk',
    points: 1,
    status: 'in progress'
  },
  '4': {
    id: 4,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in progress'
  },
  '5': {
    id: 5,
    title: 'have fun',
    desc: 'idk',
    points: 1,
    status: 'in review'
  },
  '6': {
    id: 6,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in review'
  },
  '7': {
    id: 7,
    title: 'have fun',
    desc: 'idk',
    points: 1,
    status: 'done'
  },
  '8': {
    id: 8,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'done'
  }
};

export default class ProjectBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: {
        '1': {
          id: 1,
          taskIds: [1, 2]
        },
        '2': {
          id: 2,
          taskIds: [3, 4]
        },
        '3': {
          id: 3,
          taskIds: [5, 6]
        },
        '4': {
          id: 4,
          taskIds: [7, 8]
        }
      }
    };
  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);

    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };
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
            <Droppable droppableId="1" style={{ height: '100% !important' }}>
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {this.state.columns['1'].taskIds.map((ticketId, index) => {
                      const ticket = tickets[ticketId];
                      return (
                        <Draggable draggableId={ticket.id} index={index}>
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
            <Droppable droppableId="2" style={{ height: '100%' }}>
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {this.state.columns['2'].taskIds.map((ticketId, index) => {
                      const ticket = tickets[ticketId];
                      return (
                        <Draggable draggableId={ticket.id} index={index}>
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
            <Droppable droppableId="3" style={{ height: '100%' }}>
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {this.state.columns['3'].taskIds.map((ticketId, index) => {
                      const ticket = tickets[ticketId];
                      return (
                        <Draggable draggableId={ticket.id} index={index}>
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
            <Droppable droppableId="4" style={{ height: '100%' }}>
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {this.state.columns['4'].taskIds.map((ticketId, index) => {
                      const ticket = tickets[ticketId];
                      return (
                        <Draggable draggableId={ticket.id} index={index}>
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
