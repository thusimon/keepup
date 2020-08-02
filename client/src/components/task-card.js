import React, {useState, useEffect} from 'react';
import {isTimeInToday} from '../utils/time';

const TaskCard = ({userId, taskId, taskTitle, signUps}) => {
  // lastCheckTime should UNIX time
  const [checkDisable, setCheckDisable] = useState(true);
  useEffect(() => {
    const lastCheckTime = signUps.length > 0 ? signUps[signUps.length-1] : null;
    const lastCheckTimeInt = parseInt(lastCheckTime);
    if (isNaN(lastCheckTimeInt) || isTimeInToday(lastCheckTimeInt) === -1) {
      // no lastCheckTime or lastCheckTime is before today, should enable check button
      setCheckDisable(false);
    }
  }, [taskId, signUps]);
  const onClickHandler = () => {
    const formData = new FormData();
    formData.append('task_id', taskId);
    formData.append('time_stamp', Date.now());
    fetch('/api/tasks', {
      method: 'PATCH',
      body: formData
    })
    .then(resp => resp.json())
    .then(() => {
      // should disable the check button
      setCheckDisable(true);
    });
  }
  return <div>
    <div>{taskTitle}</div>
    <div>
      <input type="checkbox" checked={checkDisable} readOnly></input>
      <button onClick={onClickHandler} disabled={checkDisable}>Sign Up!</button>
    </div>
  </div>
}

export default TaskCard;