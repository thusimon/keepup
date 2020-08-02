import React, {useState, useEffect} from 'react';

const Task = ({userId, userName}) => {
  const [tasks, setTasks] = useState([]);
  useEffect(()=> {
    fetch(`/api/tasks?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
      setTasks(data);
    })
  }, [])
  return <Header>
    Hello
  </Header>
}

export default Task;