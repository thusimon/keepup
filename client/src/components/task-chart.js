import React, {useEffect} from 'react';
import * as d3 from 'd3';

const TaskChart = ({taskList, userId}) => {
  const chartAreaId = `chart-area-${userId}`;
  useEffect(() => {
    console.log(7, taskList)
    const svg = d3.select(`#${chartAreaId}`).append('svg').attr('width', 400).attr('height', 400)
    const circle = svg.append('circle').attr('cx', 200).attr('cy', 200).attr('r',100).attr('fill', 'blue');
  }, []);
  return (
    <div className="task-chart">
      <div id={chartAreaId}></div>
    </div>
  );
}

export default TaskChart;