import {request} from './api.js';
import {addPictures, clearPictures} from './min-picture.js';
import './form.js';
import './big-picture.js';
import { getDataAlert, shuffleArray, debounce } from './utils.js';
import './img-upload.js';

const RERENDER_DELAY = 500;
const PICTURES_AMOUNT = 10;
const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');
let pictures = [];
let sortedPictures = [];

const sortPictures = (cb) => {
  filtersForm.addEventListener('click', (evt) => {
    const activeFilter = filtersForm.querySelector('.img-filters__button--active');
    evt.target.classList.toggle('img-filters__button--active');
    activeFilter.classList.toggle('img-filters__button--active');
    clearPictures();

    if (evt.target.id === 'filter-random') {
      sortedPictures = pictures.slice(0, PICTURES_AMOUNT);
      shuffleArray(sortedPictures);
      cb();
    }
    if (evt.target.id === 'filter-discussed') {
      sortedPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
      cb();
    }
    if (evt.target.id === 'filter-default') {
      sortedPictures = pictures.slice();
      cb();
    }
  });
};

const onSuccess = (data) => {
  pictures = data.slice();
  addPictures(pictures);
  filtersContainer.classList.remove('img-filters--inactive');
  sortPictures(debounce(
    () => addPictures(sortedPictures),
    RERENDER_DELAY,
  ));
};

const onError = () => {
  getDataAlert();
};

request(onSuccess, onError, 'GET');

