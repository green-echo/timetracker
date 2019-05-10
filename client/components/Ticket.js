import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  removeTicketThunk,
  updateTicketThunk,
  addUserToTicketThunk,
  getUserEmailForTicketThunk,
  removeUserFromTicketThunk
} from '../actions/ticket';
import Timer from './Timer';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { getUsersThunk } from '../actions/project';
import { runInThisContext } from 'vm';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.ticket.title,
      description: this.props.ticket.description,
      changed: false,
      open: false,
      dropdownOpen: false,
      btnDropright: false,
      userDropdownOpen: false,
      userEmail: 'select user' //this.props.ticket.user.email
      //  projectId: this.props.project.id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.userToggle = this.userToggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.select = this.select.bind(this);
  }

  select(event) {
    this.setState({ userEmail: event.target.innerText });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
  componentDidMount() {
    this.props.loadUsers(this.props.project.id);
    if (this.props.ticket.user) {
      this.setState({ userEmail: this.props.ticket.user.email });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.data.id !== this.props.data.id &&
      this.props.ticket.id === this.props.data.id
    ) {
      console.log('UPDATED');
      this.setState({
        title: this.props.data.title,
        description: this.props.data.description
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.update(this.props.ticket.id, this.props.ticket.projectId, {
      title: this.state.title,
      description: this.state.description
    });
    this.handleClose();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { provided, innerRef, ticket, data } = this.props;
    console.log(ticket, data);

    console.log(this.state.changed);
    const changedTicket = this.state.changed ? data : ticket;

    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <Card style={styles.cardContainer}>
          <CardBody style={styles.cardContainer}>
            <CardText>
              {' '}
              <b>Title: </b>
              {ticket.title}
            </CardText>
            <CardText>
              {' '}
              <b>Description: </b>
              {ticket.description}{' '}
            </CardText>

            <CardText>
              {' '}
              <b>Points: </b>
              {ticket.points}{' '}
            </CardText>
            <CardText>
              {/* {' '}
              {ticket.userId && (
                <div>Assigned To: {ticket.currentUserEmail}</div>
              )}{' '} */}
            </CardText>

            <div className="button-wrapper">
              <Button
                variant="contained"
                size="small"
                onClick={this.handleClickOpen}
              >
                Modify
              </Button>

              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Update Ticket</DialogTitle>
                <DialogContent>
                  <form onSubmit={this.handleSubmit}>
                    <label className="formLabel" htmlFor="title">
                      Title:{' '}
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <br />
                    <label className="formLabel" htmlFor="description">
                      Description:{' '}
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                    <br />
                    <button id="submit" type="submit">
                      Submit
                    </button>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this ticket?'
                    )
                  )
                    this.props.remove(ticket);
                }}
              >
                {' '}
                Remove{' '}
              </Button>
              <Timer ticket={ticket} currentUser={this.props.user.id} />
            </div>
          </CardBody>
        </Card>

        <div>
          Assigned To:
          <ButtonDropdown
            isOpen={this.state.userDropdownOpen}
            toggle={this.userToggle}
          >
            <DropdownToggle caret size="sm">
              {this.state.userEmail}
            </DropdownToggle>
            <DropdownMenu persist>
              <DropdownItem header>Select User</DropdownItem>
              <DropdownItem divider />
              {this.props.allUsers.map(user => {
                return (
                  <DropdownItem
                    onClick={() => {
                      this.props.addUserToTix(ticket.id, user.id);
                      this.select(event);
                    }}
                    key={user.id}
                  >
                    {user.email}
                  </DropdownItem>
                );
              })}
              <DropdownItem
                onClick={() => {
                  this.props.removeUserfromTix(ticket.id);
                  this.setState({ userEmail: 'select user' });
                }}
              >
                {' '}
                Unassign
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log('mapping state to store', state.ticket)
  return {
    data: state.ticket.ticket,
    allUsers: state.project.users,
    project: state.project.project,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    remove: ticket => {
      dispatch(removeTicketThunk(ticket));
    },
    update: (id, projectId, ticket) => {
      dispatch(updateTicketThunk(id, projectId, ticket));
      // update: (id, ticket) => {
      //   dispatch(updateTicketThunk(id, ticket));
    },
    loadUsers: projectId => {
      dispatch(getUsersThunk(projectId));
    },
    addUserToTix: (id, userId) => {
      dispatch(addUserToTicketThunk(id, userId));
    },
    getUserEmail: id => {
      dispatch(getUserEmailForTicketThunk(id));
    },
    removeUserfromTix: id => {
      dispatch(removeUserFromTicketThunk(id));
    }
  };
};
const styles = {
  cardContainer: {
    margin: '3px 0',
    padding: 3
  },
  title: {
    margin: 0
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
