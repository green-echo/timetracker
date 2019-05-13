import React from 'react';
import { connect } from 'react-redux';
import { getProjectsThunk } from '../actions/project';
import * as d3 from 'd3';
import { select, scaleBand, scaleLinear } from 'd3';
import { getProjectTicketsThunk } from '../actions/d3data';
class UserTimeTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { year: 2012, percent: 50 },
        { year: 2013, percent: 30 },
        { year: 2014, percent: 80 },
        { year: 2015, percent: 20 },
        { year: 2016, percent: 55 },
        { year: 2017, percent: 83 }
      ]
    };
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    this.props.loadProjects();
    this.props.loadTickets();
    window.addEventListener('resize', this.draw);
    this.draw();
  }
  componentDidUpdate() {
    this.draw();
  }
  componentWillMount() {
    window.removeEventListener('resize', this.draw);
  }
  draw() {
    const node = select(this.node);
    const bounds = node.node().getBoundingClientRect();
    const w = bounds.width;
    const h = bounds.height;
    const { tickets } = this.props;
    const xscale = scaleBand();
    xscale.domain(tickets.map(d => d.project));
    xscale.padding(0.1);
    xscale.range([0, w]);

    const yscale = scaleLinear();
    // yscale.domain(extent(data));
    yscale.domain([0, 100]);
    yscale.range([0, h]);
    const upd = node.selectAll('rect').data(tickets);
    upd
      .enter()
      .append('rect')
      .merge(upd)
      .attr('x', d => xscale(d.project))
      .attr('y', d => h - yscale(d.points))
      .attr('width', xscale.bandwidth())
      .attr('height', d => yscale(d.points))
      .attr('fill', 'pink')
      .append('text')
      .text(d => xscale(d.project));
  }
  render() {
    console.log('TICKETS', this.props.tickets);
    return (
      <svg
        style={{ width: '100%', height: '100%' }}
        ref={node => {
          this.node = node;
        }}
      />
    );
  }
}
const mapState = state => {
  return {
    email: state.user.email,
    projects: state.project.projects,
    tickets: state.d3data.tickets
  };
};
const mapDispatch = dispatch => ({
  loadProjects: () => {
    dispatch(getProjectsThunk());
  },
  loadTickets: () => {
    dispatch(getProjectTicketsThunk());
  }
});
export default connect(mapState, mapDispatch)(UserTimeTable);
