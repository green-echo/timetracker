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
import Column from './Column';

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
const div = {
  minHeight: '50px'
};

class ProjectBoard extends React.Component {
  componentDidMount() {
    this.props.getProject();
    this.props.loadProjects();
    this.props.loadUsers();
    this.props.loadProjectUser();
  }

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
      },
      dropdownOpen: false,
      userDropdownOpen: false,
      btnDropright: false
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
    console.log('all users', this.props.allUsers);
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
          {/* User Dropdown for addding users to a project */}
          <ButtonDropdown
            isOpen={this.state.userDropdownOpen}
            toggle={this.userToggle}
          >
            <DropdownToggle caret>All Users</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>All Users</DropdownItem>
              <DropdownItem divider />
              {this.props.allUsers.map(user => {
                return (
                  <DropdownItem
                    key={user.id}
                    onClick={() => this.props.addUser(user)}
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

          <DragDropContext onDragEnd={this.onDragEnd}>
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
              <Column columns={this.state.columns} id="1" tickets={tickets} />
              <Column columns={this.state.columns} id="2" tickets={tickets} />
              <Column columns={this.state.columns} id="3" tickets={tickets} />
              <Column columns={this.state.columns} id="4" tickets={tickets} />
            </Row>
          </DragDropContext>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('mapping state to store', state.selectedCampus)
  return {
    currentProject: { id: 1, name: 'Hersheys' },
    users: [
      { id: 1, name: 'Ariel' },
      { id: 2, name: 'Christina' },
      { id: 3, name: 'Katarina' }
    ],
    project: state.project.project,
    projects: state.project.projects,
    allUsers: state.project.users
  };
};

const mapDispatchToProps = (dispatch, id) => {
  return {
    getProject: () => {
      const projectId = id.match.params.id;
      dispatch(getProjectThunk(projectId));
    },
    loadProjects: () => {
      dispatch(getProjectsThunk());
    },
    loadUsers: () => {
      dispatch(getUsersThunk());
    },
    loadProjectUser: () => {
      const projectId = id.match.params.id;
      dispatch(getProjectUsersThunk(projectId));
    },
    addUser: user => {
      const projectId = id.match.params.id;
      dispatch(addUserThunk(projectId, user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
