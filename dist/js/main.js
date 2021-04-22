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



// Открытие/закрытие модального окна.....


const modal = document.querySelector('.modal'),
      modalContent = document.querySelector('.modal__content'),
      openButton = document.querySelectorAll('[data-modal]');

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

modal.addEventListener('click', (evt) => {
  if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
    closeModal();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

const modalTimerId = setTimeout(openModal, 50000);

function showModalByScroll () {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);


// Используем классы для шаблонизации карточек.....

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

// Функция получения данных с сервера

// const getResource = async (url) => {
//   const result = await fetch(url);

//   if (!result.ok) {
//     throw new Error(`Could not fetch ${url}, status ${result.status}`);
//   }

//   return await result.json();
// };

// Получаем данные карт с сервера

// getResource('http://localhost:3000/menu')
//   .then(data => {
//     data.forEach(({img, altimg, title, descr, price}) => {
//       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
//   });

axios.get('http://localhost:3000/menu')
  .then(data => {
    data.data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });


// Формы.....


const forms = document.querySelectorAll('form');
const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что то пошло не так...',
};

forms.forEach(item => {
  bindPostData(item);
});

// Функция отправки данных на сервер

const postData = async (url, data) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await result.json();
};

// Отправляем данные формы на сервер

function bindPostData(form) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement('afterend', statusMessage);

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries())); // Переврдим данные формы в json

    postData('http://localhost:3000/requests', json)
    .then(data => {
      console.log(data);
      showThanksModal(message.success);
      statusMessage.remove();
    })
    .catch(() => {
      showThanksModal(message.failure);
    })
    .finally(() => {
      form.reset();
    });

  });
}

// Функция отрисовки сообщения от отправке данных

function showThanksModal (message) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');
  openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class="modal__title">${message}</div>
    </div>
  `;
  document.querySelector('.modal').append(thanksModal);

  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
  }, 4000);
}


fetch('http://localhost:3000/menu')
  .then(data => data.json())
  .then(result => console.log(result));




// Fetch API


// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({name: 'Chertila'}),
//   headers: {
//     'Content-type': 'application/json'
//   }
// })
//   .then(response => response.json())
//   .then(json => console.log(json));




});

