const throttle = require('lodash.throttle');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  button: document.querySelector('button'),
};

let formData = {};
let position = 0;

refs.button.addEventListener('click', onSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onInput(e) {
  formData[e.target.name] = e.target.value;
  return formData;
}

function onSubmit(e) {
  e.preventDefault();

  setTimeout(() => {
    const intervalId = setInterval(() => {
      if (position === amount) {
        clearInterval(intervalId);
        return;
      }
      createPromise()
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, step);
  }, delay);
}

function createPromise(position, delay) {
  const { delay, step, amount } = formData;
  return new Promise((resolve, reject) => {
    position += 1;
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
