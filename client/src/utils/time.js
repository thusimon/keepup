export const isTimeInToday = (time) => {
  const curTime = new Date(Date.now());
  const todayStart = new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate());
  if (time < todayStart.getTime()) {
    // time is in or before yesterday
    return -1;
  } else {
    return 0;
  }
}
