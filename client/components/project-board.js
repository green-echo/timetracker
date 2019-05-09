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
import classnames from 'classnames';

import {
  getProjectThunk,
  getProjectsThunk,
  getUsersThunk,
  getProjectUsersThunk,
  addUserThunk,
  updateColumnsThunk
} from '../actions/project';
import { createTicketsObject, columnName } from '../utils';
import {
  getTicketsThunk,
  getTicketIdsThunk,
  reorderTicketThunk
} from '../actions/ticket';
import Column from './Column';

const div = {
  minHeight: '50px'
};

class ProjectBoard extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.props.getProject(projectId);
    this.props.loadProjects();
    this.props.loadUsers();
    this.props.loadProjectUser();
    this.props.loadTickets(projectId);
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
    // this.props.update();
    // await Promise.all(
    //   this.props.loadTicketIds(id, 'to_do'),
    //   this.props.loadTicketIds(id, 'in_progress'),
    //   this.props.loadTicketIds(id, 'in_review'),
    //   this.props.loadTicketIds(id, 'done')
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.allTickets.length, this.props.allTickets.length);

    if (prevProps.allTickets.length !== this.props.allTickets.length) {
      console.log(
        this.props.project.id,
        this.props.toDoTickets,
        this.props.inProgressTickets,
        this.props.inReviewTickets,
        this.props.doneTickets
      );
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
      tickets: {},
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
    this.userToggle = this.userToggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
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
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onDragEnd = result => {
    this.props.reorderTicket(result);
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

    if (source.droppableId === destination.droppableId) {
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

      console.log(newColumn);

      this.props.update(newColumn, null);

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

    console.log(newStart, newFinish);

    this.props.update(newStart, newFinish);

    this.setState(newState);
  };
  render() {
    return (
      <div>
        <Container className="project-board">
          <Row>
            <Col xs={6}>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret size="sm">
                  {this.props.project.name}
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

              <ButtonDropdown
                isOpen={this.state.userDropdownOpen}
                toggle={this.userToggle}
              >
                <DropdownToggle caret size="sm">
                  {' '}
                  Users On Project
                </DropdownToggle>
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
            </Col>
            <Col xs={6} className="right-nav">
              <Link to={`/projects/${this.props.project.id}/newticket`}>
                <Button outline color="info" size="sm">
                  New Ticket
                </Button>
              </Link>
              <Link to={`/projects/${this.props.project.id}/adduser`}>
                <Button outline color="info" size="sm">
                  Add User
                </Button>
              </Link>
            </Col>
          </Row>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row>
              <Col className="projectName">{this.props.project.name}</Col>
            </Row>
            <Row className="board-header">
              <Col
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggleTab('1');
                }}
              >
                To Do <span> ({this.props.toDoTickets.length})</span>
              </Col>
              <Col
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => {
                  this.toggleTab('2');
                }}
              >
                In Progress
                <span> ({this.props.inProgressTickets.length})</span>
              </Col>
              <Col
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => {
                  this.toggleTab('3');
                }}
              >
                In Review <span> ({this.props.inReviewTickets.length})</span>
              </Col>
              <Col
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => {
                  this.toggleTab('4');
                }}
              >
                Done <span> ({this.props.doneTickets.length})</span>
              </Col>
            </Row>

            <Row className="board-container" activetab={this.state.activeTab}>
              <Column
                columns={this.state.columns}
                id="1"
                tickets={this.state.tickets}
                tabId="1"
                activetab={this.state.activeTab}
              />

              <Column
                columns={this.state.columns}
                id="2"
                tickets={this.state.tickets}
                tabId="2"
                activetab={this.state.activeTab}
              />

              <Column
                columns={this.state.columns}
                id="3"
                tickets={this.state.tickets}
                tabId="3"
                activetab={this.state.activeTab}
              />

              <Column
                columns={this.state.columns}
                id="4"
                tickets={this.state.tickets}
                tabId="4"
                activetab={this.state.activeTab}
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
    },
    update: (col1, col2) => {
      dispatch(updateColumnsThunk(col1, col2, projectId));
    },
    reorderTicket: result => {
      dispatch(reorderTicketThunk(result));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
