import React, {useEffect} from 'react';
import * as d3 from "d3";

const Statistics = () => {
  useEffect(() => {
    console.log('page loaded')
    const svg = d3.select('#chart-area').append('svg').attr('width', 400).attr('height', 400)
    const circle = svg.append('circle').attr('cx', 200).attr('cy', 200).attr('r',100).attr('fill', 'blue');

  }, []);
  return <div>
    <div id="chart-area"></div>
  </div>
}

export default Statistics;