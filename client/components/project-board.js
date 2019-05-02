import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Ticket from './ticket';
import StatusColumn from './status-column';
const toDoTickets = [
  {
    id: 1,
    title: 'create User',
    desc: 'idk',
    points: 1,
    status: 'to do'
  },
  {
    id: 2,
    title: 'create footer',
    desc: 'idk2',
    points: 4,
    status: 'to do'
  }
];
const inProgressTickets = [
  {
    id: 3,
    title: 'create nav',
    desc: 'idk',
    points: 1,
    status: 'in progress'
  },
  {
    id: 4,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in progress'
  }
];
const inReview = [
  {
    id: 5,
    title: 'have fun',
    desc: 'idk',
    points: 1,
    status: 'in review'
  },
  {
    id: 6,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in review'
  }
];
const done = [
  {
    id: 7,
    title: 'have fun',
    desc: 'idk',
    points: 1,
    status: 'done'
  },
  {
    id: 8,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'done'
  }
];

export default class ProjectBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: {
        '1': {
          id: 1,
          taskIds: []
        },
        '2': {
          id: 2,
          taskIds: [0, 1]
        },
        '3': {
          id: 3,
          taskIds: []
        },
        '4': {
          id: 4,
          taskIds: []
        }
      }
    };
  }
  onDragEnd = result => {
    console.log('RESULT --> ', result);
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

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };
    //retrieve the column
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
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
            <Droppable droppableId="1">
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {toDoTickets.map(ticket => {
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
                    {this.state.columns['2'].taskIds.map((ticketId, index) => {
                      console.log('taskIds', this.state.columns['2'].taskIds);
                      console.log('ticketId', ticketId);
                      const ticket = inProgressTickets[ticketId];
                      console.log('TICKET --> ', ticket);
                      return (
                        // this index needs to be ordered
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
            <Droppable droppableId="3">
              {provided => (
                <Col>
                  <StatusColumn
                    provided={provided}
                    innerRef={provided.innerRef}
                  >
                    {inReview.map(ticket => {
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
                    {done.map(ticket => {
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
