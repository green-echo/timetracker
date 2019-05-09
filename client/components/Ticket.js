import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removeTicketThunk, updateTicketThunk , addUserToTicketThunk} from '../actions/ticket';
import Timer from './Timer';
import { Card, CardText, CardBody, CardTitle, CardSubtitle , ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import {getUsersThunk} from '../actions/project';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.ticket.title,
      description: this.props.ticket.description,
      open: false,
      dropdownOpen: false,
      btnDropright: false,
    //  projectId: this.props.project.id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.userToggle = this.userToggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
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
  componentDidMount () {
    this.props.loadUsers( this.props.project.id);
  }

  async handleSubmit(event) {
    event.preventDefault();
    // console.log('THIS PROPS!!!!!', this.props)
    this.props.update(this.props.ticket.id, {
      title: this.state.title,
      description: this.state.description
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
console.log(this.props.project.id)
    const { provided, innerRef, ticket } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <Card style={styles.cardContainer}>
          <CardBody style={styles.cardContainer}>
            <CardText  > {ticket.title}</CardText>
            <CardText > {ticket.description} </CardText>

            <CardText> Points left: {ticket.points} </CardText>
     

            <Button size="small" onClick={this.handleClickOpen}>
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

            <Button onClick={() => {
                if (window.confirm('Are you sure you want to delete this ticket?') )
                  this.props.remove(ticket); }}  > Remove </Button>

            <Timer ticket={ticket} />
            <CardText>
           
              {/* {ticket.userId && (
                <div>Assigned To: {ticket.currentUserEmail}</div>
              )} */}
              
            </CardText>

          </CardBody>
        </Card>

        <div>Assigned To:      
               <ButtonDropdown
                isOpen={this.state.userDropdownOpen}
                toggle={this.userToggle}
              >
                <DropdownToggle caret size="sm">
                  select user
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select User</DropdownItem>
                  <DropdownItem divider />
                  {this.props.allUsers.map(user => {
                    return (
                     
                      <DropdownItem    onClick={() => this.props.addUserToTix(ticket.id, user.id)} 
                        key={user.id}>
                        {user.email}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </ButtonDropdown>
                 
                 
                  </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log('mapping state to store', state.ticket)
  return { data: state.ticket ,
    allUsers: state.project.users,
    project: state.project.project,};
};

const mapDispatchToProps = (dispatch, ownProps)=> {

  return {
    remove: ticket => {
      dispatch(removeTicketThunk(ticket));
    },
    update: (id, ticket) => {
      dispatch(updateTicketThunk(id, ticket));
    },
    loadUsers: (projectId) => {
      dispatch(getUsersThunk(projectId));
    },
    addUserToTix: (id, userId) => {
      dispatch(addUserToTicketThunk(id, userId))
    }
  };
};
const styles = {
  cardContainer: {
    marginBottom: 8,
    padding:3
  },
  title: {
    margin:0
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
