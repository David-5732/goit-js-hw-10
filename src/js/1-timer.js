// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// ПОЛУЧАЄМ ДОСТУПИ ДО DOM ЕЛЕМЕНТІВ

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// НАКИДАУЄМ СЛУХАЧ ПОДІЙ НА КНОПКУ

startBtn.addEventListener('click', startTime);

// ГЛОБАЛЬНІ ЗМІННІ

let userSelectedDate = null;
let nowDate = new Date();

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// ФУНКЦІЯ НАТИСКАННЯ КНОПКИ

function startTime() {
  startBtn.disabled = true;
  input.disabled = true;
  const intervalId = setInterval(() => {
    const startTimeResult = userSelectedDate - new Date();
    let objTime = convertMs(startTimeResult);

    if (startTimeResult <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      input.disabled = false;
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
    }

    days.textContent = addLeadingZero(objTime.days);
    hours.textContent = addLeadingZero(objTime.hours);
    minutes.textContent = addLeadingZero(objTime.minutes);
    seconds.textContent = addLeadingZero(objTime.seconds);
  }, 1000);
}

// ФУНКЦІЯ ОБЧИСЛЕННЯ

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

// ОБ'ЄКТ OPTIONS

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= nowDate) {
      //   window.alert('Please choose a date in the future');
      
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);
