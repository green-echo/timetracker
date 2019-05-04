import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectsThunk } from '../actions/project';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.loadProjects();
  }

  render() {
    console.log('projects', this.props.projects);
    const userProjects = this.props.projects;
    if (userProjects) {
      return (
        <div>
          <div>
            <h3>Welcome, {this.props.email}</h3>
          </div>
          <div className="projects">
            <h5>Here are all of your current projects:</h5>
            {this.props.projects.map(project => {
              return (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  {' '}
                  <p>{project.name}</p>{' '}
                </Link>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Welcome, {this.props.email}</h3>
        </div>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    projects: state.ticket.projects
  };
};
const mapDispatch = dispatch => ({
  loadProjects: () => {
    dispatch(getProjectsThunk());
  }
});
export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
