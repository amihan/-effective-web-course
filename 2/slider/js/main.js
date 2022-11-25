const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const sliders = document.querySelectorAll('.slide__item');

let index;

const changeClassActive = (n) => {
    for (const slide of sliders) {
        slide.classList.remove('active');
    }
    sliders[n].classList.add('active');
    localStorage.setItem('index', n);
}

if(localStorage.getItem('index')){
    index = localStorage.getItem('index');
    changeClassActive(index);
}else{
    index = 0;
    changeClassActive(index);
}

const nextSlide = () => {
    index++;
    if (index > sliders.length - 1) {
        index = 0;
        changeClassActive(index);
    } else {
        changeClassActive(index);
    }
}

const prevSlide = () => {
    index--;
    if (index < 0) {
        index = sliders.length - 1;
        changeClassActive(index);
    } else {
        changeClassActive(index);
    }
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (event) {
    if (event.code == 'Space' || event.code == 'ArrowRight') {
        nextSlide();
    }else if(event.code == 'ArrowLeft'){
        prevSlide();
    }

});

setInterval(nextSlide, 10000);






