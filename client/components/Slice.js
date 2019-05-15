import React, { Component } from 'react';
import * as d3 from 'd3';

class Slice extends Component {
  render() {
    let { pie } = this.props;
    console.log('PIES', pie);
    let arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(100);
    let interpolate = d3.interpolateRgb('#eaaf79', '#bc3358');

    return pie.map((slice, index) => {
      console.log('SLICE', slice);
      console.log('data', this.props.alldata);

      let sliceColor = interpolate(index / (pie.length - 1));
      return (
        <React.Fragment>
          <path d={arc(slice)} fill={sliceColor} />
          {/* <text
            transform={`translate(${arc.centroid(slice)})`}
            fill="white"
            dy=".35em"
          >
            {slice.value}
          </text>> */}
          {/* {this.props.alldata.map(object => {
            return (
              <text
                transform={`translate(${arc.centroid(slice)})`}
                fill="white"
                key={object.id}
                dy=".35em"
              >
                {object.user}
              </text>
            );
          })} */}
          {Object.keys(this.props.alldata)
            .filter(key => this.props.alldata[key] === slice.data)
            .map((key, index) => {
              return <text key={key}> {this.props.alldata[key].user}</text>;
            })}
        </React.Fragment>
      );
    });
  }
}
export default Slice;
