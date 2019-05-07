import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removeTicketThunk, updateTicketThunk } from '../actions/ticket';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.ticket.title,
      description: this.props.ticket.description,
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
    const { provided, innerRef, ticket } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <Card style={styles.cardContainer}>
          <CardContent>
            <form>
              <Typography
                color="textSecondary"
                gutterBottom
                fontSize="14"
                style={{ fontWeight: 'bold' }}
              >
                {ticket.title} <br />
                {ticket.description}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Points left: {ticket.points}
                {ticket.userId && (
                  <div>Assigned To: {ticket.currentUserEmail}</div>
                )}
              </Typography>

              <CardActions>
                <Button size="small" onClick={this.handleClickOpen}>
                  Modify
                </Button>

                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Update Ticket
                  </DialogTitle>
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
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this ticket?'
                      )
                    )
                      this.props.remove(ticket);
                  }}
                >
                  Remove
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log('mapping state to store', state.ticket)
  return { data: state.ticket };
};

const mapDispatchToProps = dispatch => {
  return {
    remove: ticket => {
      dispatch(removeTicketThunk(ticket));
    },
    update: (id, ticket) => {
      dispatch(updateTicketThunk(id, ticket));
    }
  };
};
const styles = {
  cardContainer: {
    marginBottom: 8
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
