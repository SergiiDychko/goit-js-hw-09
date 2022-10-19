function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');
stopRef.disabled = true;

function changeColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = `${randomColor}`;
}

startRef.addEventListener('click', () => {
  oneSecInterval = setInterval(changeColor, 1000);
    startRef.disabled = true;
    stopRef.disabled = false;
});

stopRef.addEventListener('click', () => {
    clearInterval(oneSecInterval);
    startRef.disabled = false;
    stopRef.disabled = true;
});