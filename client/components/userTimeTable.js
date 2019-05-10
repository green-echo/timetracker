import React from 'react';
import { connect } from 'react-redux';
import { getProjectsThunk } from '../actions/project';
class UserTimeTable extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.loadProjects();
  }
  render() {
    return <div>User time table</div>;
  }
}
const mapState = state => {
  return {
    email: state.user.email,
    projects: state.project.projects
  };
};
const mapDispatch = dispatch => ({
  loadProjects: () => {
    dispatch(getProjectsThunk());
  }
});
export default connect(mapState, mapDispatch)(UserTimeTable);
