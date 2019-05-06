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
import StatusColumn from './status-column';

import { getProjectThunk, getProjectsThunk } from '../actions/project';
import { getTicketsThunk, sort } from '../actions/ticket';
import Column from './Column';

// const tickets = {
//   '1': {
//     id: 1,
//     title: 'create User',
//     desc: 'idk',
//     points: 1,
//     status: 'to do'
//   },
//   '2': {
//     id: 2,
//     title: 'create footer',
//     desc: 'idk2',
//     points: 4,
//     status: 'to do'
//   },
//   '3': {
//     id: 3,
//     title: 'create nav',
//     desc: 'idk',
//     points: 1,
//     status: 'in progress'
//   },
//   '4': {
//     id: 4,
//     title: 'create footer',
//     desc: 'idk2',
//     points: 3,
//     status: 'in progress'
//   },
//   '5': {
//     id: 5,
//     title: 'have fun',
//     desc: 'idk',
//     points: 1,
//     status: 'in review'
//   },
//   '6': {
//     id: 6,
//     title: 'create footer',
//     desc: 'idk2',
//     points: 3,
//     status: 'in review'
//   },
//   '7': {
//     id: 7,
//     title: 'have fun',
//     desc: 'idk',
//     points: 1,
//     status: 'done'
//   },
//   '8': {
//     id: 8,
//     title: 'create footer',
//     desc: 'idk2',
//     points: 3,
//     status: 'done'
//   }
// };
const div = {
  minHeight: '50px'
};
const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 30
  },
  mainBoard: {
    marginLeft: 20
  }
};
class ProjectBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // columns: {
      //   '1': {
      //     id: 1,
      //     taskIds: [1, 2]
      //   },
      //   '2': {
      //     id: 2,
      //     taskIds: [3, 4]
      //   },
      //   '3': {
      //     id: 3,
      //     taskIds: [5, 6]
      //   },
      //   '4': {
      //     id: 4,
      //     taskIds: [7, 8]
      //   }
      // },
      projectId: this.props.match.params.id,
      dropdownOpen: false,
      btnDropright: false
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.props.getProject(this.state.projectId);
    this.props.loadProjects();
    this.props.getTickets(this.state.projectId);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  /* OLD ONDRAGEND FUNCTION  */
  // onDragEnd = result => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const start = this.state.columns[source.droppableId];
  //   const finish = this.state.columns[destination.droppableId];

  //   if (start === finish) {
  //     const newTaskIds = Array.from(start.taskIds);
  //     newTaskIds.splice(source.index, 1);
  //     newTaskIds.splice(destination.index, 0, draggableId);

  //     const newColumn = {
  //       ...start,
  //       taskIds: newTaskIds
  //     };
  //     const newState = {
  //       ...this.state,
  //       columns: {
  //         ...this.state.columns,
  //         [newColumn.id]: newColumn
  //       }
  //     };
  //     this.setState(newState);
  //     return;
  //   }

  //   const startTaskIds = Array.from(start.taskIds);

  //   startTaskIds.splice(source.index, 1);
  //   const newStart = {
  //     ...start,
  //     taskIds: startTaskIds
  //   };

  //   const finishTaskIds = Array.from(finish.taskIds);
  //   finishTaskIds.splice(destination.index, 0, draggableId);
  //   const newFinish = {
  //     ...finish,
  //     taskIds: finishTaskIds
  //   };

  //   const newState = {
  //     ...this.state,
  //     columns: {
  //       ...this.state.columns,
  //       [newStart.id]: newStart,
  //       [newFinish.id]: newFinish
  //     }
  //   };
  //   this.setState(newState);
  // };
  /* NEW ONDRAG END FUNCTION  */

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    this.props.sortTix(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
  };

  render() {
    return (
      <div>
        <Container className="project-board">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.props.currentProject.name}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Projects</DropdownItem>
              <DropdownItem divider />
              {this.props.projects.map(project => {
                return (
                  <Link key={project.id} to={`/projects/${project.id}`}>
                    <DropdownItem>{project.name}</DropdownItem>
                  </Link>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>
          <Link to={`/projects/${this.props.project.id}/newticket`}>
            <Button color="danger">New Ticket</Button>
          </Link>

          {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
          <Row>
            <Col>Project Name</Col>
          </Row>
          <Row className="board-header">
            <Col>To Do</Col>
            <Col>In Progress</Col>
            <Col>In Review</Col>
            <Col>Done</Col>
          </Row>
          {/* <Row className="board-container">
              <Column columns={this.state.columns} id="1" tickets={tickets} />
              <Column columns={this.state.columns} id="2" tickets={tickets} />
              <Column columns={this.state.columns} id="3" tickets={tickets} />
              <Column columns={this.state.columns} id="4" tickets={tickets} />
            </Row> */}
          {/* </DragDropContext> */}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div style={styles.listContainer}>
              <Col>
                <Droppable droppableId="1">
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="tix-container"
                    >
                      <h3>To Do</h3>
                      {this.props.tixToDo.map((elem, index) => {
                        return (
                          <StatusColumn
                            key={elem.id}
                            index={index}
                            elem={elem}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col>
                <Droppable droppableId="2">
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="tix-container"
                    >
                      <h3>In Progress</h3>
                      {this.props.tixInPro.map((elem, index) => {
                        return (
                          <StatusColumn
                            key={elem.id}
                            index={index}
                            elem={elem}
                          />
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col>
                <Droppable droppableId="3">
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="tix-container"
                    >
                      <h3>In Review</h3>
                      {this.props.tixInRe.map((elem, index) => {
                        return (
                          <StatusColumn
                            key={elem.id}
                            index={index}
                            elem={elem}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col>
                <Droppable droppableId="4">
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="tix-container"
                    >
                      <h3>Done</h3>
                      {this.props.tixDone.map((elem, index) => {
                        return (
                          <StatusColumn
                            key={elem.id}
                            index={index}
                            elem={elem}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            </div>
          </DragDropContext>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log('mapping state to store', state);
  return {
    currentProject: { id: 1, name: 'Hersheys' },
    users: [
      { id: 1, name: 'Ariel' },
      { id: 2, name: 'Christina' },
      { id: 3, name: 'Katarina' }
    ],
    project: state.project.project,
    projects: state.project.projects,
    tixToDo: state.ticket.toDoTickets,
    tixInPro: state.ticket.inProgressTickets,
    tixInRe: state.ticket.inReviewTickets,
    tixDone: state.ticket.doneTickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProject: projectId => {
      dispatch(getProjectThunk(projectId));
    },
    loadProjects: () => {
      dispatch(getProjectsThunk());
    },
    getTickets: id => {
      dispatch(getTicketsThunk(id));
    },
    sortTix: (a, b, c, d, e) => {
      dispatch(sort(a, b, c, d, e));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
