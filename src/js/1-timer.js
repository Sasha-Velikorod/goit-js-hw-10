import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.btn');
// startBtn.disabled = true;

const timer = {
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  userSelectedDate: null,
  dataSelect: null,

  startTimer() {
    this.dataSelect = setInterval(() => {
      const diff = this.userSelectedDate - Date.now();

      if (diff <= 0) {
        clearInterval(this.dataSelect);
        this.days.textContent = '00';
        this.hours.textContent = '00';
        this.minutes.textContent = '00';
        this.seconds.textContent = '00';

        this.input.disabled = false;
        return;
      }

      let { days, hours, minutes, seconds } = convertMs(diff);

      this.days.textContent = this.addLeadingZero(days);
      this.hours.textContent = this.addLeadingZero(hours);
      this.minutes.textContent = this.addLeadingZero(minutes);
      this.seconds.textContent = this.addLeadingZero(seconds);
    }, 1000);
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      iziToast.error({
        message: '❌ Please choose a date in the future',
        position: 'topRight',
        icon: '',
      });
      startBtn.classList.add('btn-disabled');
    } else {
      timer.userSelectedDate = selectedDate;
      startBtn.classList.remove('btn-disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

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

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timer.input.disabled = true;
  timer.startTimer();
});
