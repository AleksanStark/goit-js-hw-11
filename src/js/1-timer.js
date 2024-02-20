import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// Оголошення змінних
let userSelectedDate;
let countdownInterval;

const inputDate = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = false;
    } else {
      userSelectedDate = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const convertMs = ms => {
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
};

const updateTimer = timeDifference => {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
};

const startTimer = targetTime => {
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDiff = targetTime - currentTime;

    if (timeDiff <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'CountDown Complete',
        message: 'The countdown has reached zero',
        position: 'topRight',
      });
      startButton.disabled = false;
      inputDate.disabled = false;
    } else {
      updateTimer(timeDiff);
    }
  }, 1000);
};

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  inputDate.disabled = true;
  startTimer(userSelectedDate);
});
