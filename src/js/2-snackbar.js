import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

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

  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const delayInput = document.querySelector('input[name="delay"]');

  if (!selectedRadio || delayInput.value.trim() === '') {
    iziToast.warning({
      message: 'Please select a state and enter a delay!',
      position: 'topCenter',
    });
    return;
  }

  const selectedState = selectedRadio.value;
  const delay = Number(delayInput.value);

  if (isNaN(delay) || delay < 0) {
    iziToast.warning({
      message: 'Please enter a valid positive number for delay.',
      position: 'topCenter',
    });
    return;
  }

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
