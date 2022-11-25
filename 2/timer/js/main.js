// input
const inputMinutes = document.querySelector('.minutes');
const inputSeconds = document.querySelector('.seconds');

// Buttons
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const reset = document.querySelector('.reset');

const btn1 = document.querySelector('.buttons-time__item_1');
const btn5 = document.querySelector('.buttons-time__item_5');
const btn10 = document.querySelector('.buttons-time__item_10');

const wrapper = document.querySelector('.wrapper');

const audio = new Audio('../public/click.mp3');
audio.loop = true;


let minutes;
let seconds;
let isWalking;
let timer;



minutes = localStorage.getItem('minutes') ? localStorage.getItem('minutes') : 0;
seconds = localStorage.getItem('seconds') ? localStorage.getItem('seconds') : 5;
// isWalking = localStorage.getItem('isWalking') ? localStorage.getItem('isWalking') : false;

inputMinutes.value = minutes;
inputSeconds.value = seconds;

if (localStorage.getItem('isWalking')) {
    isWalking = JSON.parse(localStorage.getItem('isWalking'));
} else isWalking = false;

console.log('aaaaa', localStorage.getItem('isWalking'));

const saveValue = (isWalking) => {
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('isWalking', isWalking);
}

const disabledInput = (isActive) => {
    inputMinutes.disabled = isActive;
    inputSeconds.disabled = isActive;
}

const disabledBtn = (isActive) => {
    btn1.disabled = isActive;
    btn5.disabled = isActive;
    btn10.disabled = isActive;
}

const startTimer = () => {
    disabledInput(true);
    disabledBtn(true);
    if (seconds > 0) {
        seconds--;
        inputSeconds.value = seconds;
        saveValue(true);
    } else if (seconds <= 0 && minutes <= 0) {
        inputSeconds.value = seconds;
        inputMinutes.value = minutes;

        wrapper.style.backgroundColor = 'red';
        clearInterval(timer);
        audio.play();

        saveValue(false);
    } else if (seconds === 0) {
        minutes--;
        inputMinutes.value = minutes;
        seconds = 60;
        saveValue(true);
    }
}


if (isWalking) {
    clearInterval(timer);
    timer = setInterval(startTimer, 1000);
}


const resetTimer = () => {
    disabledInput(false);
    clearInterval(timer);
    disabledBtn(false);

    audio.pause();
    audio.currentTime = 0;

    wrapper.style.backgroundColor = 'beige';

    minutes = 0;
    seconds = 0;
    inputMinutes.value = minutes;
    inputSeconds.value = seconds;

    saveValue(false);
}

inputSeconds.addEventListener('change', () => {
    seconds = inputSeconds.value;
    saveValue(false);
})

inputMinutes.addEventListener('change', () => {
    minutes = inputMinutes.value;
    saveValue(false);
});



const setTime = (minute) => {
    wrapper.style.backgroundColor = 'beige';
    minutes = minute;
    seconds = 0;

    inputMinutes.value = minutes;
    inputSeconds.value = seconds;

    saveValue(false);
}

btn1.addEventListener('click', () => setTime(1));
btn5.addEventListener('click', () => setTime(5));
btn10.addEventListener('click', () => setTime(10));



start.addEventListener('click', () => {
    clearInterval(timer);
    timer = setInterval(startTimer, 1000);
});

stop.addEventListener('click', () => {
    audio.pause();

    disabledInput(false);
    disabledBtn(false);

    clearInterval(timer);

    saveValue(false);
});

reset.addEventListener('click', resetTimer);










