import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startRef = document.querySelector('[data-start]');
startRef.disabled = true;

let timeFromInput = 0;
let msTimeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeFromInput = selectedDates[0];
    if (options.defaultDate >= timeFromInput) {
      Notify.failure('Please choose a date in the future');
    }
    msTimeDifference = timeFromInput - options.defaultDate;
    startRef.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let timerObj = {};

function addLeadingZero(value) {
  value = String(value);
  return value.padStart(2, '0');
}

let oneSecInterval;

startRef.addEventListener('click', () => {
  oneSecInterval = setInterval(startTimer, 1000);
});

function startTimer() {
  timerObj = convertMs(msTimeDifference);
  daysRef.textContent = addLeadingZero(timerObj.days);
  hoursRef.textContent = addLeadingZero(timerObj.hours);
  minutesRef.textContent = addLeadingZero(timerObj.minutes);
  secondsRef.textContent = addLeadingZero(timerObj.seconds);
  msTimeDifference = msTimeDifference - 1000;
  if (Number(msTimeDifference) < 999) {
    clearInterval(oneSecInterval);
    Notify.success('Time is up');
  }
}
