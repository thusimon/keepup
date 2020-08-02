const tasks = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_TASKS': {
      const {tasks} = action;
      return tasks;
    }
    case 'ADD_TASK': {
      const {userId, taskTitle, taskId} = action;
      const userTasks = state[userId] || [];
      userTasks.push({taskId, taskTitle});
      const newTasks =  {[userId]: userTasks};
      return {...state, newTasks};
    }
    default:
      return state;
  }
}

export default tasks