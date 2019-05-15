import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleOrdinal } from 'd3-scale';
import * as d3 from 'd3';
import { getUsersOnProjectThunk } from '../actions/d3data';
import { getProjectThunk } from '../actions/project';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import Slice from './Slice';

class PieChart extends Component {
  componentDidMount() {
    this.props.getUsersOnProj();
    this.props.getProject();
  }
  render() {
    console.log('DATA', this.props.userdata);
    const height = 500;
    const width = 500;

    if (this.props.userdata.length) {
      let data = this.props.userdata.map(object => object.points);
      console.log('DATA!!!', data);
      let pie = d3.pie()(data);
      return (
        <svg height={height} width={width}>
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            <Slice pie={pie} alldata={this.props.userdata} />
          </g>
        </svg>
      );
    } else {
      return <div>were waiting for data</div>;
    }
  }
}
const mapStateToProps = state => {
  return {
    userdata: state.d3data.userdata,
    project: state.project.project
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const projectId = ownProps.match.params.id;
  return {
    getProject: () => {
      dispatch(getProjectThunk(projectId));
    },
    getUsersOnProj: () => {
      dispatch(getUsersOnProjectThunk(projectId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
