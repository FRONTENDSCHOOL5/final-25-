import BASE_URL from '../utils/baseUrl';

const uploadImage = async imageFile => {
  const imageBody = new FormData();
  imageBody.append('image', imageFile);

  try {
    const response = await fetch(`${BASE_URL}/image/uploadfiles`, {
      method: 'POST',
      headers: {},
      body: imageBody,
    });

    const data = await response.json();
    const newImage = `${BASE_URL}/${data[0].filename}`;
    return newImage;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const imagesAPI = {
  uploadImage,
};

export default imagesAPI;
