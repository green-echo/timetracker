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
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import socket from '../socket';

import {
  getProjectThunk,
  getProjectsThunk,
  getUsersThunk,
  addUserThunk,
  updateColumnsThunk
} from '../actions/project';
import { generateNewState, handleDrag } from '../utils';
import { getTicketsThunk } from '../actions/ticket';
import Column from './Column';

const div = {
  minHeight: '50px'
};

class ProjectBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: {
        to_do: {
          id: 1,
          taskIds: []
        },
        in_progress: {
          id: 2,
          taskIds: []
        },
        in_review: {
          id: 3,
          taskIds: []
        },
        done: {
          id: 4,
          taskIds: []
        }
      },
      dropdownOpen: false,
      btnDropright: false,
      numTickets: 0,
      tickets: {},
      activeTab: 'to_do'
    };
    this.toggle = this.toggle.bind(this);
    this.userToggle = this.userToggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.props.getProject(projectId);
    this.props.loadProjects();
    this.props.loadUsers();
    this.props.loadTickets(projectId);
    socket.emit('join', projectId);
    socket.on('board-change', data => {
      this.setState(data);
    });
    socket.on('new user', () => {
      this.props.loadUsers();
    });
    this.setState(generateNewState(this.props));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allTickets.length !== this.props.allTickets.length) {
      const newState = generateNewState(this.props);
      this.setState(newState);
      socket.emit('board-change', this.props.match.params.id, newState);
    }

    if (
      prevProps.ticket.id !== this.props.ticket.id ||
      ((prevProps.ticket.id === this.props.ticket.id &&
        prevProps.ticket.title !== this.props.ticket.title) ||
        prevProps.ticket.description !== this.props.ticket.description)
    ) {
      const newState = generateNewState(this.props);
      console.log(newState);
      this.setState({
        tickets: newState.tickets
      });
      socket.emit('board-change', this.props.match.params.id, newState);
    }
    if (prevProps.match.params.id !== this.props.match.params.id) {
      socket.emit('leave', prevProps.match.params.id);
      socket.emit('join', this.props.match.params.id);
      this.props.getProject();
      this.props.loadTickets();
    }
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
    const newState = handleDrag(result, this.state);

    this.props.reorder(result);

    this.setState(newState);

    socket.emit('board-change', this.props.match.params.id, newState);
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
                className={classnames({
                  active: this.state.activeTab === 'to_do'
                })}
                onClick={() => {
                  this.toggleTab('to_do');
                }}
              >
                To Do{' '}
                <span> ({this.state.columns['to_do'].taskIds.length})</span>
              </Col>
              <Col
                className={classnames({
                  active: this.state.activeTab === 'in_progress'
                })}
                onClick={() => {
                  this.toggleTab('in_progress');
                }}
              >
                In Progress
                <span>
                  {' '}
                  ({this.state.columns['in_progress'].taskIds.length})
                </span>
              </Col>
              <Col
                className={classnames({
                  active: this.state.activeTab === 'in_review'
                })}
                onClick={() => {
                  this.toggleTab('in_review');
                }}
              >
                In Review{' '}
                <span> ({this.state.columns['in_review'].taskIds.length})</span>
              </Col>
              <Col
                className={classnames({
                  active: this.state.activeTab === 'done'
                })}
                onClick={() => {
                  this.toggleTab('done');
                }}
              >
                Done <span> ({this.state.columns['done'].taskIds.length})</span>
              </Col>
            </Row>

            <Row className="board-container" activetab={this.state.activeTab}>
              <Column
                columns={this.state.columns}
                id="to_do"
                tickets={this.state.tickets}
                tabId="1"
                activetab={this.state.activeTab}
                allUsers={this.props.allUsers}
              />

              <Column
                columns={this.state.columns}
                id="in_progress"
                tickets={this.state.tickets}
                tabId="2"
                activetab={this.state.activeTab}
                allUsers={this.props.allUsers}
              />

              <Column
                columns={this.state.columns}
                id="in_review"
                tickets={this.state.tickets}
                tabId="3"
                activetab={this.state.activeTab}
                allUsers={this.props.allUsers}
              />

              <Column
                columns={this.state.columns}
                id="done"
                tickets={this.state.tickets}
                tabId="4"
                activetab={this.state.activeTab}
                allUsers={this.props.allUsers}
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
    to_do: state.ticket.to_do,
    in_progress: state.ticket.in_progress,
    in_review: state.ticket.in_review,
    done: state.ticket.done,
    allTickets: state.ticket.allTickets,
    allUsers: state.project.users,
    ticket: state.ticket.ticket
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
    addUser: userId => {
      dispatch(addUserThunk(projectId, userId));
    },
    loadTickets: () => {
      dispatch(getTicketsThunk(projectId));
    },
    reorder: result => {
      dispatch(updateColumnsThunk(result, projectId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
