import React, {useRef} from 'react';
import './create-task.css';

const CreateTask = ({userId, closeModel}) => {
  const inputEl = useRef(null);
  const cancelBtnHander = () => {
    closeModel(false);
  }
  const submitBtnHander = () => {
    const taskTitle = inputEl.current.value
    if (taskTitle) {
      const formData = new FormData();
      formData.append('user', userId);
      formData.append('title', taskTitle);
      fetch('/api/tasks', {
        method: 'POST',
        body: formData
      })
      .then(resp => resp.json())
      .then(() => {
        closeModel(true);
      });
    } else {
      alert('Please provide brief task title');
    }
  }
  return (
    <div className="create-task">
      <div className="task-name">
        <label>Task Name</label>
        <input ref={inputEl} placeholder="Briefly name your task here"></input>
      </div>
      <div className="task-btns">
        <button className="secondary" onClick={cancelBtnHander}>Cancel</button>
        <button className="primary" onClick={submitBtnHander}>Create</button>
      </div>
    </div>
  )
}

export default CreateTask;
