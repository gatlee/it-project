const CLOUDINARY_API_URL =
  'https://api.cloudinary.com/v1_1/pure-and-lazy/upload';

const generateCloudinaryUrl = async (data: Blob): Promise<string> => {
  const payload = new FormData();
  payload.append('file', data);
  payload.append('upload_preset', 'upload');

  const response = await fetch(CLOUDINARY_API_URL, {
    method: 'post',
    body: payload,
  });
  const body = await response.json();
  return body.url;
};

export { generateCloudinaryUrl };
