function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

  // Слайдер каруселью


  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prevButton = document.querySelector(prevArrow),
        nextButton = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }


  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(item => {
    item.style.width = width;
  });

  slider.style.position = 'relative';

  const dots = document.createElement('ol'),
    dotsArray = [];

  dots.classList.add('carousel-dots');
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    dots.append(dot);
    dotsArray.push(dot);
  }

  function getCurrent() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function getDot() {
    dotsArray.forEach(dot => dot.style.opacity = '0.5');
    dotsArray[slideIndex - 1].style.opacity = '1';
  }

  function onlyNumber(string) {
    return +string.replace(/\D/g, '');
  }


  prevButton.addEventListener('click', () => {
    if (offset == 0) {
      offset = onlyNumber(width) * (slides.length - 1);
    } else {
      offset -= onlyNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    getCurrent();
    getDot();
  });


  nextButton.addEventListener('click', () => {
    if (offset == onlyNumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += onlyNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    getCurrent();
    getDot();
  });


  dotsArray.forEach(dot => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;

      offset = onlyNumber(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      getCurrent();
      getDot();
    });
  });

}

export default slider;
