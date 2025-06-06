import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const selectedState = document.querySelector('input[name="state"]:checked');
console.log(selectedState);

function createPromise(delay, selectedState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(`Fulfilled after ${delay}ms`);
      } else {
        reject(`Rejected after ${delay}ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const selectedState = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  const delay = document.querySelector('input[name="delay"]').value;

  createPromise(delay, selectedState)
    .then(result => {
      iziToast.success({
        message: result,
        position: 'topCenter',
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topCenter',
      });
    });
});
