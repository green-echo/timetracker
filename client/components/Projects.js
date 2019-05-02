import React from 'react';
import { ProjectBoard } from './project-board';
import { connect } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import { getProjectsThunk } from '../store/ticket';

class Project extends React.Component {
 

  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    console.log(this.props.data);
    return <div />;
  }
}

const mapStateToProps = state => {
  console.log('!!!!', state.ticket.projects);
  return { data: state.projects };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      dispatch(getProjectsThunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
