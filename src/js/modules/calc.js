function calc() {

  // Калькулятор калорий

  const result = document.querySelector('.calculating__result span');
  let sex,
      height,
      weight,
      age,
      ratio;

  if (localStorage.getItem('user-sex')) {
    sex = localStorage.getItem('user-sex');
  } else {
    sex = 'female';
    localStorage.setItem('user-sex', 'female');
  }

  if (localStorage.getItem('user-ratio')) {
    ratio = localStorage.getItem('user-ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('user-ratio', 1.375);
  }


  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('user-sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('user-ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex == 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  calcTotal();


  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-ratio')) {
          ratio = +evt.target.getAttribute('data-ratio');
          localStorage.setItem('user-ratio', +evt.target.getAttribute('data-ratio'));
        } else {
          sex = evt.target.getAttribute('id');
          localStorage.setItem('user-sex', evt.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        evt.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }
  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');


  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');

}

export default calc;
