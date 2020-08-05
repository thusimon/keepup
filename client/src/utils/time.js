const dayMS = 24*60*60*1000;

export const isTimeInToday = (time) => {
  if (isNaN(time)) {
    return false;
  }
  const curTime = new Date(Date.now());
  const todayStart = new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate()).getTime()
  return time > todayStart;
}

export const getTimeElaspedFromNow = (time) => {
  if (isNaN(time)) {
    return {
      clz: 'new-task',
      msg: 'New Task'
    };
  }
  const curTime = Date.now();
  const timeElapsed = curTime - time;
  if (timeElapsed < 60000) {
    // within 1 min
    return {
      clz: 'today',
      msg: 'Just now'
    };
  } else if (timeElapsed < 60 * 60000) {
    return {
      clz: 'today',
      msg: `${Math.floor(timeElapsed/60000)} mins ago`
    };
  } else if (timeElapsed < 120 * 60000) {
    return {
      clz: 'today',
      msg: `1 hour ago`
    };
  } else if (timeElapsed < dayMS) {
    return {
      clz: 'today',
      msg: `${Math.floor(timeElapsed/3600000)} hours ago`
    }
  } else {
    const days = Math.floor(timeElapsed/dayMS);
    if (days === 1) {
      return {
        clz: 'days-ago-1',
        msg: '1 day ago'
      }
    } else if (days <= 2) {
      return {
        clz: 'days-ago-2',
        msg: `${days} days ago`
      }
    } else if (days <= 7) {
      return {
        clz: 'days-ago-7',
        msg: `${days} days ago`
      }
    } else {
      return {
        clz: 'days-ago-30',
        msg: `${days} days ago`
      }
    }
  }
}

export const getCurrentWeek = () => {
  const curTime = new Date(Date.now());
  const todayStart = new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate()).getTime();
  const todayDayOfWeek = curTime.getDay();
  const weekStart = todayStart - todayDayOfWeek*dayMS;
  const currentWeek = [];
  for (let day = 0; day < 7; day++) {
    currentWeek.push(weekStart + day*dayMS)
  }
  return currentWeek;
}

export const mapSignUpToWeekly = (signUps, week, currentDay) => {

}
export const getTaskWeeklyData = (taskList) => {
  const currentWeek = getCurrentWeek();
  return taskList.map(task => {
    const signUps = task.sign_up;

  })
}
