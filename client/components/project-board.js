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

import {
  getProjectThunk,
  getProjectsThunk,
  getUsersThunk,
  getProjectUsersThunk,
  addUserThunk
} from '../actions/project';
import { createTicketsObject } from '../utils';
import { getTicketsThunk, getTicketIdsThunk } from '../actions/ticket';
import Column from './Column';

const div = {
  minHeight: '50px'
};

class ProjectBoard extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProject(id);
    this.props.loadProjects();
    this.props.loadUsers();
    this.props.loadProjectUser();
    this.props.loadTickets(id);
    this.setState({
      columns: {
        '1': {
          id: 1,
          taskIds: this.props.toDoTickets
        },
        '2': {
          id: 2,
          taskIds: this.props.inProgressTickets
        },
        '3': {
          id: 3,
          taskIds: this.props.inReviewTickets
        },
        '4': {
          id: 4,
          taskIds: this.props.doneTickets
        }
      },
      numTickets: this.props.allTickets.length,
      tickets: createTicketsObject(this.props.allTickets)
    });
    // await Promise.all(
    //   this.props.loadTicketIds(id, 'to_do'),
    //   this.props.loadTicketIds(id, 'in_progress'),
    //   this.props.loadTicketIds(id, 'in_review'),
    //   this.props.loadTicketIds(id, 'done')
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allTickets.length !== this.props.allTickets.length) {
      this.setState({
        columns: {
          '1': {
            id: 1,
            taskIds: this.props.toDoTickets
          },
          '2': {
            id: 2,
            taskIds: this.props.inProgressTickets
          },
          '3': {
            id: 3,
            taskIds: this.props.inReviewTickets
          },
          '4': {
            id: 4,
            taskIds: this.props.doneTickets
          }
        },
        numTickets: this.props.allTickets.length,
        tickets: createTicketsObject(this.props.allTickets)
      });
    }
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getProject();
      this.props.loadTickets();
    }
  }

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
          taskIds: []
        },
        '3': {
          id: 3,
          taskIds: []
        },
        '4': {
          id: 4,
          taskIds: []
        }
      },
      dropdownOpen: false,
      btnDropright: false,
      numTickets: 0,
      tickets: {}
    };
    this.toggle = this.toggle.bind(this);
    this.userToggle = this.userToggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  userToggle() {
    this.setState({
      userDropdownOpen: !this.state.userDropdownOpen
    });
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
      <div>
        <Container className="project-board">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.props.project.name}</DropdownToggle>
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
          {/* User Dropdown for addding users to a project */}
          <ButtonDropdown
            isOpen={this.state.userDropdownOpen}
            toggle={this.userToggle}
          >
            <DropdownToggle caret>Users On Project</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Users On Project</DropdownItem>
              <DropdownItem divider />
              {this.props.allUsers.map(user => {
                return (
                  <DropdownItem
                    key={user.id}
                    // onClick={() => this.props.addUser(user.id)}
                  >
                    {user.email}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>
          <Link to={`/projects/${this.props.project.id}/newticket`}>
            <Button color="danger">New Ticket</Button>
          </Link>
          <Link to={`/projects/${this.props.project.id}/adduser`}>
            <Button color="primary">Add User</Button>
          </Link>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row>
              <Col>{this.props.project.name}</Col>
            </Row>
            <Row className="board-header">
              <Col>To Do</Col>
              <Col>In Progress</Col>
              <Col>In Review</Col>
              <Col>Done</Col>
            </Row>
            <Row className="board-container">
              <Column
                columns={this.state.columns}
                id="1"
                tickets={this.state.tickets}
              />
              <Column
                columns={this.state.columns}
                id="2"
                tickets={this.state.tickets}
              />
              <Column
                columns={this.state.columns}
                id="3"
                tickets={this.state.tickets}
              />
              <Column
                columns={this.state.columns}
                id="4"
                tickets={this.state.tickets}
              />
            </Row>
          </DragDropContext>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: [
      { id: 1, name: 'Ariel' },
      { id: 2, name: 'Christina' },
      { id: 3, name: 'Katarina' }
    ],
    project: state.project.project,
    projects: state.project.projects,
    toDoTickets: state.ticket.toDoTickets,
    inProgressTickets: state.ticket.inProgressTickets,
    inReviewTickets: state.ticket.inReviewTickets,
    doneTickets: state.ticket.doneTickets,
    allTickets: state.ticket.allTickets,
    allUsers: state.project.users
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const projectId = ownProps.match.params.id;
  return {
    getProject: () => {
      dispatch(getProjectThunk(projectId));
    },
    loadProjects: () => {
      dispatch(getProjectsThunk());
    },
    loadUsers: () => {
      dispatch(getUsersThunk(projectId));
    },
    loadProjectUser: () => {
      dispatch(getProjectUsersThunk(projectId));
    },
    addUser: userId => {
      dispatch(addUserThunk(projectId, userId));
    },
    loadTickets: () => {
      dispatch(getTicketsThunk(projectId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
