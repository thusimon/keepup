import React, {useState, useEffect} from 'react';
import Loading from './loading';
import EmptyCharts from './empty-charts';
import './user-tasks.css';
import TaskChart from './task-chart';

const UserCharts = ({userName, userId}) => {
  const [taskList, setTaskList] = useState([]);
  // 0: loading, 1 show charts
  const [viewState, setViewState] = useState(0);
  const getTasks = (userId) => {
    fetch(`/api/tasks?userId=${userId}`)
    .then(res => res.json())
    .then(tasks => {
      setTaskList(tasks);
      setViewState(1)
    });
  }
  useEffect(()=> {
    getTasks(userId);
  }, [userId]);

  const mainDisplay = () => {
    if (viewState === 0) {
      return <Loading />
    } else {
      return taskList && taskList.length > 0 ? <TaskChart taskList={taskList} userId={userId} /> : <EmptyCharts />
    }
  }
  return (<div className="user-tasks">
    <div className="name-badge">
      <span className="profile">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span>{userName}</span>
      </span>
    </div>
    <div className="tasks">
      {mainDisplay()}
    </div>
  </div>)
}

export default UserCharts;