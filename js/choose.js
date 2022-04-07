import { fileChooser, previewImg, showImageModal, } from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onFileChooserChangeButton = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImg.onload = () => {
      URL.revokeObjectURL(previewImg.src);
    };
    previewImg.src = URL.createObjectURL(fileChooser.files[0]);
    showImageModal();
  }

};

const addFileChooser = () => {
  fileChooser.addEventListener('change', onFileChooserChangeButton);
};

export { addFileChooser, };
