// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { updateTicket } from '../store';

// class UpdateTicket extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       description: '',
//       points: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }


//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     this.props.update(this.props.data.id, {
//       title: this.state.title,
//       description: this.state.description,
//       points: this.state.points
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label className="formLabel" htmlFor="title">
//           Title:{' '}
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={this.state.title}
//           onChange={this.handleChange}
//         />
//         <br />
//         <label className="formLabel" htmlFor="description">
//           Description:{' '}
//         </label>
//         <input
//           type="text"
//           name="description"
//           value={this.state.description}
//           onChange={this.handleChange}
//         />
//         <br />
//         <label className="formLabel" htmlFor="points">
//           Points:
//         </label>
//         <input
//           type="number"
//           name="points"
//           min="1"
//           value={this.state.points}
//           onChange={this.handleChange}
//         />
//         <br />
//         <button
//           type="submit"
//           disabled={
//             !this.state.title || !this.state.description || !this.state.points
//           }
//         >
//           Submit
//         </button>
//       </form>
//     );
//   }
// }

// const mapStateToProps = state => {
//   // console.log('mapping state to store', state.selectedCampus)
//   return { data: state.ticket };
// };

// const mapDispatchToProps = function(dispatch) {
//   const ticketId = this.props.match.params.id;
//   return {
//     update: (ticketId, ticket) => {
//       dispatch(updateTicket(ticketId, ticket));
//     },
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UpdateTicket);
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class UpdateTicket extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}