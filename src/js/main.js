"use strict";

// Показ и переключение табсов.....

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade-anim');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade-anim');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
});


// Открытие/закрытие модального окна.....


const modal = document.querySelector('.modal'),
      modalContent = document.querySelector('.modal__content'),
      openButton = document.querySelectorAll('[data-modal]'),
      closeButton = document.querySelector('.modal__close');

const openModal = function () {
  modal.classList.add('show');
  modalContent.classList.add('popup-anim');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
  window.removeEventListener('scroll', showModalByScroll);
};

openButton.forEach(button => {
  button.addEventListener('click', openModal);
});

const closeModal = function () {
  modal.classList.add('hide');
  modal.classList.remove('show');
  modalContent.classList.remove('popup-anim');
  document.body.style.overflow = '';
};

closeButton.addEventListener('click', closeModal);

modal.addEventListener('click', (evt) => {
  if (evt.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

// const modalTimerId = setTimeout(openModal, 10000);

function showModalByScroll () {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);


// Используем классы для карточек.....

class MenuCard {
  constructor(src, alt, title, description, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.description = description;
    this.price = price;
    this.transfer = 75;
    this.parent = document.querySelector(parentSelector);
    this.classes = classes;
    this.changeToRubl();
  }

  changeToRubl() {
    this.price = this.price * this.transfer;
  }

  render() {
    const element = document.createElement('div');

    if (this.classes.length === 0) {
      this.element = 'menu__item';
      element.classList.add(this.element);
    } else {
      this.classes.forEach(className => element.classList.add(className));
    }

    element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.description}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> Руб/день</div>
      </div>
    `;

    this.parent.append(element);
  }
}

new MenuCard(
  "img/tabs/vegy.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  10,
  '.menu .container',
  'menu__item'
).render();

new MenuCard(
  "img/tabs/elite.jpg",
  "elite",
  'Меню "Премиум"',
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  19,
  '.menu .container',
  'menu__item'
).render();

new MenuCard(
  "img/tabs/post.jpg",
  "post",
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  15,
  '.menu .container',
  'menu__item'
).render();









