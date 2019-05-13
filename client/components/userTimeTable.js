import React from 'react';
import { connect } from 'react-redux';
import { getProjectsThunk } from '../actions/project';
import * as d3 from 'd3';
import { select, scaleBand, scaleLinear } from 'd3';
import { getProjectTicketsThunk } from '../actions/d3data';

class UserTimeTable extends React.Component {
  constructor() {
    super();

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
    yscale.domain([0, 100]);
    yscale.range([0, h]);
    const upd = node.selectAll('rect').data(tickets);
    upd
      .enter()
      .append('rect')
      .merge(upd)
      .attr('x', (d, i) => xscale(d.project))
      .attr('y', (d, i) => h - yscale(d.points))
      .attr('width', xscale.bandwidth())
      .attr('height', d => yscale(d.points))
      .attr('fill', 'pink');

    const textUpd = node.selectAll('text').data(tickets);
    textUpd
      .enter()
      .append('text')
      .text(d => d.points)
      .attr('x', (d, i) => xscale(d.project))
      .attr('y', (d, i) => h - yscale(d.points));
  }

  render() {
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
