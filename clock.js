/* const secondHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {

  function* seconds() {
    let s = 0;
    console.log('mm');
    while (true) {
      if (s > 59) {
        s = 0;
      }
      console.log('while')
      yield s++
    }

    function* minutes() {
      let m = 0;
      while (true) {
        if (m > 59) {
          m = 0;
        }
      }
      yield m++
    }

    function* hours() {
      let h = 0;
      while (true) {
        if (h > 12) {
          h = 0;
        }
      }
      yield h++
    }

    const now = new Date();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    console.log(seconds);

    let minutes = minutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
    console.log(minutes);

    const hour = hours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    console.log(hour);
  }

  setInterval(setDate, 1000);
} */

const secondHand = document.querySelector('.s');
const minutesHand = document.querySelector('.m');
const hourHand = document.querySelector('.h');

const now = new Date();

let secondsGenerator = seconds(now.getSeconds() + 1);
let minutesGenerator = minutes(now.getMinutes() + 1);
let hoursGenerator = hours(now.getHours() % 12 + 1);

secondHand.innerText = addZero(now.getSeconds());
minutesHand.innerText = addZero(now.getMinutes());
hourHand.innerText = addZero(now.getHours() % 12);

function setDate() {
  const seconds = secondsGenerator.next().value;
  secondHand.innerText = addZero(seconds);

  console.log('seconds ' + seconds);

  if (seconds === 0) {
    const minutes = minutesGenerator.next().value;
    minutesHand.innerText = addZero(minutes);
    console.log('minutes ' + minutes);
  }
  if (minutes === 0) {
    const hour = hoursGenerator.next().value;
    hourHand.innerText = addZero(hour);
    console.log('hour ' + hour);
  }
}

function addZero(value) {
  return ('0' + value).slice(-2);
}

setInterval(setDate, 1000);

function* seconds(s) {
  while (true) {
    if (s > 59) {
      s = 0;
    }
    console.log('sGen ' + s);
    yield s++;
  }
}

function* minutes(m) {
  while (true) {
    if (m > 59) {
      m = 0;
    }
    console.log('mGen ' + m);
    yield m++;
  }
}

function* hours(h) {
  while (true) {
    if (h > 12) {
      h = 0;
    }
    console.log('hGen ' + h);
    yield h++;
  }
}
