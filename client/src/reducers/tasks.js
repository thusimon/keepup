const tasks = (state = {}, action) => {
  switch (action.type) {
    case 'CLOSE_CREATE_TASK_MODEL': {
      const {tasks} = action;
      return tasks;
    }
    default:
      return state;
  }
}

export default tasks