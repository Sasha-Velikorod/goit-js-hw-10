import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

const onSubmit = e => {
  e.preventDefault();

  const form = e.currentTarget;
  const delayValue = Number(form.elements.delay.value);
  const stateValue = form.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  })

    .then(delayValue => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
        icon: '',
      });
    })
    .catch(delayValue => {
      iziToast.error({
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
        icon: '',
      });
    });

  form.reset();
};

formEl.addEventListener('submit', onSubmit);
