import './utils.js';
import './big-picture.js';
import './validation.js';
import './photo-effects.js';
import './scale.js';
import './upload-data.js';
import './upload-image.js';
import {renderThumbnails} from './thumbnail.js';
import {uploadPhoto, hideEditPhoto} from './upload-form.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './validation.js';
import {initFilters} from './photo-filter.js';

getData((posts) => {
  getData(renderThumbnails);
  uploadPhoto();
  setUserFormSubmit(hideEditPhoto);
  initFilters(posts); // Появляются фильтры для сортировки фотографий
});
