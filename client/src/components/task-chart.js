import React, {useEffect, useRef} from 'react';
import {getTaskWeeklyViewData} from '../utils/time';
import * as d3 from 'd3';
import './task-chart.css';

const TaskChart = ({taskList, userId}) => {
  const chartAreaId = `chart-area-${userId}`;
  const margin = {left: 100, right: 0, top: 0, bottom: 40};
  const chartRef = useRef(null);
  const drawTask = (g, viewDataAll, width, height) => {
    console.log(12, viewDataAll)
    const viewData = viewDataAll[0].weekView;
    const yName = viewDataAll.map(d=>d.title);
    const x = d3.scaleBand().domain(viewData.map(d=>d.dayName)).range([0, width]).paddingInner(0.3).paddingOuter(0.3);
    const y = d3.scaleBand().domain(yName).range([0, height]).paddingInner(0.3).paddingOuter(0.3);
    const xAxisCall = d3.axisBottom(x);
    const yAxisCall = d3.axisLeft(y);
    g.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${height})`).call(xAxisCall).selectAll('text')
      .attr('y', '10').attr('x', '-5').attr('text-anchor', 'end').attr('transform', 'rotate(-40)');
    g.append('g').attr('class', 'y-axis').call(yAxisCall).selectAll('text')
      .attr('y', '0').attr('x', '-100').attr('text-anchor', 'end').attr('transform', 'rotate(-40)');
    
    g.selectAll(".series")
      .data(viewDataAll)
    .enter().append("g")
      .attr("class", "series")
    .selectAll(".point")
      .data(d => d.weekView)
    .enter().append("circle")
      .attr("class", "point")
      .attr("r", 5)
      .attr("cx", d => x(d.dayName))
      .attr("cy", d => y(d.title))
      .attr('fill', d=> {
        let color;
        if (d.weekDayView === 0) {
          color='#FF0000';
        } else if(d.weekDayView === 1) {
          color='#00FF00';
        } else {
          color='#999999';
        }
        return color;
      });
  }
  useEffect(() => {
    const chartE = chartRef.current;
    const cw = chartE.clientWidth;
    const ch = chartE.clientHeight;
    const svgw = cw - margin.left - margin.right;
    const svgh = ch - margin.top - margin.bottom; 
    getTaskWeeklyViewData(taskList);
    const svg = d3.select(`#${chartAreaId}`).append('svg').attr('width', cw).attr('height', ch);
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    drawTask(g, taskList, svgw, svgh);
  }, []);
  return (
    <div className="task-chart" ref={chartRef}>
      <div id={chartAreaId}></div>
    </div>
  );
}

export default TaskChart;