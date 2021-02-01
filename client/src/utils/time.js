import {WEEKDAY} from './date';

const dayMS = 24*60*60*1000;

export const getTodayStart = () => {
  const curTime = new Date(Date.now());
  return new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate()).getTime();
}

export const isTimeInToday = (time) => {
  if (isNaN(time)) {
    return false;
  }
  const todayStart = getTodayStart();
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


export const isDayInSignUps = (day, signUps) => {
  const signUpInDay = signUps.filter(signUp => {
    return signUp >= day && signUp <= day + dayMS;
  });
  return signUpInDay.length > 0;
}

export const mapSignUpToWeekly = (title, signUps, week, todayStart) => {
  return week.map((weekDay, idx) => {
    const isSigned = isDayInSignUps(weekDay, signUps);
    const weekDayPassed = weekDay <= todayStart;
    const dayName = WEEKDAY[idx];
    let weekDayView = 0;
    // signed 1, not signed 0, future day -1;
    if (isSigned) {
      weekDayView = 1;
    } else if (weekDayPassed) {
      weekDayView = 0;
    } else {
      weekDayView = -1;
    }
    return {
      weekDayView,
      weekDay,
      dayName,
      title
    };
  });
}

export const getTaskWeeklyViewData = (taskList) => {
  const currentWeek = getCurrentWeek();
  const todayStart = getTodayStart();
  return taskList.map(task => {
    task.weekView = mapSignUpToWeekly(task.title, task.sign_up, currentWeek, todayStart);
    return task;
  });
}

export const getSignUpRate = (taskList, backToDays) => {
  const startTodayTime = getTodayStart();
  if (backToDays > 0) {
    const searchToTime = startTodayTime - dayMS * backToDays;
    return taskList.map(task => {
      const signUps = task.sign_up.filter(s => s >= searchToTime);
      task.data = signUps.length / backToDays;
      task.range = [searchToTime, startTodayTime];
      task.name = task.title;
      return task;
    });
  } else {
    // find the day the task is created
    return taskList.map(task => {
      const createdTime = task.createdAt;
      let daysFromCreated = Math.floor((startTodayTime - createdTime) / dayMS);
      daysFromCreated = daysFromCreated > 0 ? daysFromCreated : 1;
      task.data = task.sign_up.length / daysFromCreated;
      task.range = [createdTime, startTodayTime];
      task.name = task.title;
      return task;
    });
  }
}
