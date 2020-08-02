import React, {useState, useEffect} from 'react';
import TaskCard from './task-card';

const UserTasks = ({userName, userId}) => {
  const [taskList, setTaskList] = useState([]);
  useEffect(()=> {
    fetch(`/api/tasks?userId=${userId}`)
    .then(res => res.json())
    .then(tasks => {
      console.log("will set tasks", tasks);
      setTaskList(tasks);
    })
  }, [userId])
  return <div>
    <div>{userName}</div>
    {
      taskList.map(task => {
        return <TaskCard key={task._id} userId={userId} taskId={task._id} taskTitle={task.title} signUps={task.sign_up} />
      })
    }
  </div>
}

export default UserTasks;