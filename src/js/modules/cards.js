function cards() {


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

  // Получение данных для отрисовкм карточек

  // fetch('http://localhost:3000/menu')
  //   .then(data => data.json());


  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });



}

module.exports = cards;
