import React, {useState, useEffect} from 'react';
import TaskCard from './task-card';
import Loading from './loading';
import EmptyTasks from './empty-tasks';
import CreateTask from './create-task';
import './user-tasks.css';

const UserTasks = ({userName, userId}) => {
  const [taskList, setTaskList] = useState([]);
  // 0: loading, 1 show list, 2 show create modal 
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
  
  const addTaskHandler = () => {
    setViewState(2);
  }

  const closeModel = (shouldSyncTasks) => {
    setViewState(0);
    getTasks(userId);
  }

  const mainDisplay = () => {
    if (viewState === 0) {
      return <Loading />
    } else if (viewState === 1) {
      return taskList && taskList.length > 0 ?
      taskList.map(task => {
        return <TaskCard key={task._id} userId={userId} taskId={task._id} taskTitle={task.title} signUps={task.sign_up} />
      }) :
      <EmptyTasks />
    } else {
      return <CreateTask userId={userId} closeModel={closeModel} />
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
      <span className="add-task-btn" onClick={addTaskHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      </span>
    </div>
    <div className="tasks">
      {mainDisplay()}
    </div>
  </div>)
}

export default UserTasks;