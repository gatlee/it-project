import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { Upload } from 'react-bootstrap-icons';
import './ProjectItemimage.css';

const ProjectItemImage = () => {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log('placeholder')}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <div className="project-image-container">
              <Image
                src="https://picsum.photos/180/180"
                fluid
                className="w-100"
              />
              <div className="project-image-overlay">
                <Upload className="fa fa-user upload-icon" />
              </div>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export { ProjectItemImage };
