import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value => Notify.success(value))
    .catch(error => Notify.failure(error));
}

const submitBtnRef = document.querySelector('button[type="submit"]');

function mySubmit(event) {
  event.preventDefault();
  const delayRef = Number(document.querySelector('input[name="delay"]').value);
  const stepRef = Number(document.querySelector('input[name="step"]').value);
  const amountRef = Number(
    document.querySelector('input[name="amount"]').value
  );
  for (let i = 0; i < amountRef; i += 1) {
    let promiseNum = i + 1;
    let promiseDelay = delayRef + stepRef * i;
    createPromise(promiseNum, promiseDelay);
  }
}

submitBtnRef.addEventListener('click', mySubmit);
