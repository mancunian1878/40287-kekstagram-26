import {request} from './api.js';
import { addPictures, clearPictures } from './min-picture.js';
import './min-picture.js';
import './data.js';
import './utils.js';
import './form.js';
import {uploadFormOpen, minimizePhoto, maximizePhoto, applyEffect, setUploadFormSubmit} from './form.js';
import './big-picture.js';
import { getDataAlert } from './utils.js';
import { shuffleArray } from './utils.js';
import {debounce} from './utils.js';
import './img-upload.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');
const RERENDER_DELAY = 500;
let pictures = [];
let sortedPictures = [];

setUploadFormSubmit();
uploadFormOpen();
minimizePhoto();
maximizePhoto();
applyEffect();

filtersContainer.classList.remove('img-filters--inactive');

const sort = (cb) => {
  filtersForm.addEventListener('click', (evt) => {
    const activeFilter = filtersForm.querySelector('.img-filters__button--active');
    evt.target.classList.toggle('img-filters__button--active');
    activeFilter.classList.toggle('img-filters__button--active');
    clearPictures();

    if (evt.target.id === 'filter-random') {
      sortedPictures = pictures.slice(0, 10);
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
  sort(debounce(
    () => addPictures(sortedPictures),
    RERENDER_DELAY,
  ));
};

const onError = () => {
  getDataAlert();
};

request(onSuccess, onError, 'GET');
