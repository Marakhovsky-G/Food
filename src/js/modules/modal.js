function openModal(modalSelector, modalTimerId) {
  const modalContent = document.querySelector('.modal__content'),
        modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modalContent.classList.add('popup-anim');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modalContent = document.querySelector('.modal__content'),
        modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  modalContent.classList.remove('popup-anim');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

  const modal = document.querySelector(modalSelector),
        openButton = document.querySelectorAll(triggerSelector);

  openButton.forEach(button => {
    button.addEventListener('click', () => {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    });
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {openModal};
export {closeModal};
