const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const imageUploadInput = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');
const effectsPreviews = [...effectsPreview];

imageUploadInput.addEventListener('change', () => {
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((element) => {
      element.style.backgroundImage = `url("${imageUploadPreview.src}")`;
    });
  }
});
