const timer = (selector, deadline) => {

  const getTimeRemaining = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date()),
          seconds = Math.floor(time/1000 % 60),
          minutes = Math.floor((time/1000/60) % 60),
          hours = Math.floor((time/1000/60/60) % 24),
          days = Math.floor(time/1000/60/60/24);

    return {
      'total': time,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days': days,
    };
  };

  const addZero = (num) => {
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  };

  const setTimer = (selector, deadline) => {
    const timer = document.querySelector(selector),
          seconds = timer.querySelector('#seconds'),
          minutes = timer.querySelector('#minutes'),
          hours = timer.querySelector('#hours'),
          days = timer.querySelector('#days'),
          timeInterval = setInterval(updateTime, 1000);

    function updateTime() {
      const t = getTimeRemaining(deadline);

      seconds.textContent = addZero(t.seconds);
      minutes.textContent = addZero(t.minutes);
      hours.textContent = addZero(t.hours);
      days.textContent = addZero(t.days);

      if (t.total <= 0) {
        seconds.textContent = '00';
        minutes.textContent = '00';
        hours.textContent = '00';
        days.textContent = '00';

        clearInterval(timeInterval);
      }
    }
    updateTime();
  };
  setTimer(selector, deadline);

};

export default timer;
