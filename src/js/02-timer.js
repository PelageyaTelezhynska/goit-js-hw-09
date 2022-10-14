import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";



const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMin: document.querySelector('span[data-minutes]'),
  timerSecs: document.querySelector('span[data-seconds]')
}

let selectedDate = {};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtn)

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
    
  },
};

flatpickr(refs.input, options);

function onStartBtn() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  const intervalId = setInterval(() => {
    const timerTime = selectedDate - Date.now();
  const getTime = convertMs(timerTime);
    getTimeComponents(getTime);

    if (timerTime <= 0) {
      clearClockFace();
      return;
  }
  }, 1000)

}

function clearClockFace() {
  clearInterval(intervalId)
      refs.input.disabled = false;
      refs.startBtn.disabled = false;
      getTimeComponents(convertMs(0));
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function getTimeComponents({ days, hours, minutes, seconds }) {
refs.timerDays.textContent = addLeadingZero(days);
    refs.timerHours.textContent = addLeadingZero(hours);
    refs.timerMin.textContent = addLeadingZero(minutes);
    refs.timerSecs.textContent = addLeadingZero(seconds)
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



