import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startRef = document.querySelector('[data-start]');
startRef.disabled = true;

let msTimeDifference = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  const timeFromInput = selectedDates[0];
    if (Date.now() >= timeFromInput) {
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

function getEl(el) { return document.querySelector(`[data-${el}]`) };

function addLeadingZero(value) {
  value = String(value);
  return value.padStart(2, '0');
}

let oneSecInterval;
startRef.addEventListener('click', () => {
  oneSecInterval = setInterval(startTimer, 1000);
});

function startTimer() {
 const timerObj = convertMs(msTimeDifference);

  for (key in timerObj) {
  getEl(key).textContent = addLeadingZero(timerObj[key]);
}
  msTimeDifference = msTimeDifference - 1000;
  if (Number(msTimeDifference) <= 0) {
    clearInterval(oneSecInterval);
    Notify.success('Time is up');
  }
}
