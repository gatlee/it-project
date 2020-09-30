import React from 'react';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const ProjectItemImage = () => {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log('placeholder')}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Image
              src="https://picsum.photos/180/180"
              fluid
              className="w-100"
            />
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export { ProjectItemImage };
