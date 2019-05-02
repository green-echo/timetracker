import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  createTicketThunk } from '../store';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      points: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({title: nextProps.selectedStudent.firstName, lastName:nextProps.selectedStudent.lastName
  //   , email:nextProps.selectedStudent.email})
  //  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.create({
      title: this.state.title,
      description: this.state.description,
      points: this.state.points
    });
    this.setState({title: '', description: '', points:''})
  }

  render() {
    return (
    
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
        <label className="formLabel" htmlFor="points">
          Points:
        </label>
        <input
          type="number"
          name="points"
          min="1"
          value={this.state.points}
          onChange={this.handleChange}
        />
        <br />
        <button
          type="submit"
          disabled={
            !this.state.title || !this.state.description || !this.state.points
          }
        >
          Submit
        </button>
      </form>
  
    );
  }
}

const mapStateToProps = state => {
  // console.log('mapping state to store', state.selectedCampus)
  return { data: state.ticket };
};

const mapDispatchToProps = function(dispatch) {
 // const ticketId = this.props.match.params.id;
  return {
    create: ticket => {
      dispatch(createTicketThunk(ticket));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
