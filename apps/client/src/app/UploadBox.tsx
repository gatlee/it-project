import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';

const UploadBox = () => {
  const [image, setImage] = useState(null);
  const url = 'https://api.cloudinary.com/v1_1/pure-and-lazy/upload';

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      const data = new FormData();
      data.append('file', img);
      data.append('upload_preset', 'upload');

      fetch(url, {
        method: 'post',
        body: data,
      }).then((r) =>
        r.json().then((data) => {
          setImage(data.url);
        })
      );
    }
  };

  return (
    <>
      <Form>
        <Form.File
          id="custom-file"
          label="Custom file input"
          onChange={onImageChange}
          custom
        />
      </Form>
      <Image src={image}></Image>
    </>
  );
};

export { UploadBox };
