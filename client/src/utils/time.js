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
        clz: 'days-ago-2',
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
