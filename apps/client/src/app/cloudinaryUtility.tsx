import { truncateSync } from 'fs';

const CLOUDINARY_API_URL =
  'https://api.cloudinary.com/v1_1/pure-and-lazy/upload';

interface CloudinaryResponse {
  url: string;
  pages?: number;
}

const generateCloudinaryUrls = async (
  data: Blob
): Promise<CloudinaryResponse> => {
  const payload = new FormData();
  payload.append('file', data);
  payload.append('upload_preset', 'upload');
  payload.append('pages', 'true');

  const response = await fetch(CLOUDINARY_API_URL, {
    method: 'post',
    body: payload,
  });

  if (response.ok) {
    const body = await response.json();
    return { url: body.secure_url, pages: body.pages };
  } else {
    throw new Error(response.statusText);
  }
};

const generateCloudinaryUrl = async (data: Blob): Promise<string> => {
  const payload = new FormData();
  payload.append('file', data);
  payload.append('upload_preset', 'upload');

  const response = await fetch(CLOUDINARY_API_URL, {
    method: 'post',
    body: payload,
  });

  if (response.ok) {
    const body = await response.json();
    return body.secure_url;
  } else {
    throw new Error(response.statusText);
  }
};

export { generateCloudinaryUrl, generateCloudinaryUrls };
