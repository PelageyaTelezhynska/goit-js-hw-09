
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

let intervalId = null;


refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtn(e) {

    refs.startBtn.setAttribute('disabled', '');
refs.stopBtn.removeAttribute('disabled');
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
        console.log(refs.body.style.backgroundColor);
   }, 1000)
}

function onStopBtn(e) {
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', '');
    clearInterval(intervalId);

}    


