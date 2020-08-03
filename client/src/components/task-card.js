import React, {useState, useEffect} from 'react';
import {getTimeElaspedFromNow} from '../utils/time';
import './task-card.css';

const TaskCard = ({userId, taskId, taskTitle, signUps}) => {
  // lastCheckTime should UNIX time
  const [signState, setSignState] = useState({
    disable: true,
    clz: 'new-task',
    msg: ''
  });
  useEffect(() => {
    const lastCheckTime = signUps.length > 0 ? signUps[signUps.length-1] : null;
    const timeElaspsedInfo = getTimeElaspedFromNow(parseInt(lastCheckTime));
    if (timeElaspsedInfo.clz !== 'today') {
      // no lastCheckTime or lastCheckTime is before today, should enable check button
      setSignState({
        disable: false,
        clz: timeElaspsedInfo.clz,
        msg: timeElaspsedInfo.msg
      });
    } else {
      setSignState({
        disable: true,
        clz: timeElaspsedInfo.clz,
        msg: timeElaspsedInfo.msg
      });
    }
  }, [taskId, signUps]);
  const onClickHandler = () => {
    const formData = new FormData();
    const signedTime = Date.now();
    formData.append('task_id', taskId);
    formData.append('time_stamp', signedTime);
    fetch('/api/tasks', {
      method: 'PATCH',
      body: formData
    })
    .then(resp => resp.json())
    .then(() => {
      // should disable the check button
      setSignState({
        disable: true,
        clz: 'today',
        msg: 'Just now'
      });
    });
  }
  return <div className="task-card">
    <div className={`task-info ${signState.clz}`}>
      <div className="task-title">{taskTitle}</div>
      <div className="task-last-signed">{`Last signed at: ${signState.msg}`}</div>
    </div>
    <div className="task-sign">
      <button onClick={onClickHandler} disabled={signState.disable}>Sign Up!</button>
    </div>
  </div>
}

export default TaskCard;