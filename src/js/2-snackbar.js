import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = [...stateInputs].find(input => input.checked)?.value;
  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: '✅',
        message: ` Fulfilled after ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        message: ` Rejected after ${delay}ms`,
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
