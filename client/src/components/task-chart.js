import React, {useEffect, useRef, useState} from 'react';
import { getSignUpRate } from '../utils/time';
import { drawTask, updateTask } from './charts/bar-chart';
import './task-chart.css';

const TaskChart = ({taskList, userId}) => {
  const chartAreaId = `chart-area-${userId}`;
  const [config, setConfig] = useState({});
  const [svg, setSVG] = useState(null);
  const chartRef = useRef(null);
  useEffect(() => {
    const chartE = chartRef.current;
    getSignUpRate(taskList, 7);
    const config = {
      containerId: `#${chartAreaId}`, 
      width: chartE.clientWidth,
      height: chartE.clientHeight, 
      margin: {left: 40, right: 40, top: 40, bottom: 40}
    };
    setConfig(config);
    const svg = drawTask(config, taskList);
    setSVG(svg);
  }, []);
  const selectChange = evt => {
    const taskRange = parseInt(evt.target.value);
    getSignUpRate(taskList, taskRange);
    updateTask(taskList, config, svg);
  }
  return (
    <div className="task-chart" ref={chartRef}>
      <div className="chart-option">
        <select onChange={selectChange}>
          <option value="7" selected>Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="120">Last 120 days</option>
          <option value="365">Last 365 days</option>
          <option value="-1">All</option>
        </select>
      </div>
      <div id={chartAreaId}></div>
    </div>
  );
}

export default TaskChart;