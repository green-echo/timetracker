import React from 'react';
import { connect } from 'react-redux';
import { getProjectsThunk } from '../actions/project';
import * as d3 from 'd3';
import { select, scaleBand, scaleLinear } from 'd3';
import { getProjectTicketsThunk } from '../actions/d3data';
// Note this component can eventually get deleted (its no longer being used) but I stiill want to use it for some of its code
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
    xscale.range([0, w]);
    var ordinalColorScale = d3.scaleOrdinal(d3.schemeCategory10);
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
      .attr('fill', 'pink')
      .style('fill', function(d, i) {
        return ordinalColorScale(i);
      });

    const textUpd = node.selectAll('text').data(tickets);
    textUpd
      .enter()
      .append('text')
      .text(d => d.points)
      .attr('x', (d, i) => xscale(d.project))
      .attr('y', (d, i) => h - yscale(d.points));
    const margin = 20;
    const width = 400;
    const height = 100;
    const x = d3
      .scalePoint()
      .domain(tickets.map(ticket => ticket.project))
      .range([0, width]);

    var xAxis = d3.axisBottom(x);
    const svg = d3
      .select('svg')
      .attr('width', width)
      .attr('height', height + margin)
      .append('g');

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
    // const chart = node.selectAll('.bar-label').data(tickets);
    // chart
    //   .enter()
    //   .append('g')
    //   .classed('x axis', true)
    //   .attr('transform', 'translate(' + 0 + ',' + (h + 2) + ')')
    //   .call(xAxis)
    //   .selectAll('text')
    //   .classed('x-axis-label', true)
    //   .style('text-anchor', 'start')
    //   .attr('dx', 8)
    //   .attr('dy', 10)
    //   .attr('transform', 'rotate(45)')
    //   .style('font-size', '12px');

    // chart
    //   .enter()
    //   .append('text')
    //   .classed('bar-label', true)
    //   .attr('x', function(d, i) {
    //     return xscale(d.project) + xscale.bandwidth();
    //   })
    //   .attr('dx', -30)
    //   .attr('y', function(d, i) {
    //     return yscale(d.points);
    //   })
    //   .attr('dy', 18)
    //   .style('font-size', '12px')
    //   .text(function(d) {
    //     return d.points;
    //   });

    // x-axis-label
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
