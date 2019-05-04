import React from 'react';
import { ProjectBoard } from './project-board';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from 'reactstrap';
import { getProjectsThunk } from '../actions/project';

class Project extends React.Component {
  componentDidMount() {
    console.log('PROPSSS', this.props);
    this.props.getProjects();
  }
  render() {
    console.log('rendering');
    console.log(this.props.data);
    return (
      <div>
        <Link to="/newproject">
          {' '}
          <Button color="danger">New Project</Button>
        </Link>
        <ListGroup>
          {this.props.projects.map(project => {
            return (
              <Link to={`/projects/${project.id}`}>
                <ListGroupItem>{project.name}</ListGroupItem>
              </Link>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('!!!!', state.ticket.projects);
  // console.log('!!!!', state);

  return { projects: state.project.projects };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      dispatch(getProjectsThunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
