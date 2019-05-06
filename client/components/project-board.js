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
import { createTicketsObject } from '../utils';
import { getProjectThunk, getProjectsThunk } from '../actions/project';
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
    this.props.loadTickets(id);
    // await Promise.all(
    //   this.props.loadTicketIds(id, 'to_do'),
    //   this.props.loadTicketIds(id, 'in_progress'),
    //   this.props.loadTicketIds(id, 'in_review'),
    //   this.props.loadTicketIds(id, 'done')
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, this.props);
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
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
    // console.log('props:', this.props);
    // console.log('state:', this.state);
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
    toDoTickets: state.ticket.toDoTickets,
    inProgressTickets: state.ticket.inProgressTickets,
    inReviewTickets: state.ticket.inReviewTickets,
    doneTickets: state.ticket.doneTickets,
    allTickets: state.ticket.allTickets
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
    loadTickets: projectId => {
      dispatch(getTicketsThunk(projectId));
    },
    loadTicketIds: (projectId, status) => {
      dispatch(getTicketIdsThunk(projectId, status));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
