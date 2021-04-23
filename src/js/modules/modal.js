function modal() {


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

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;
