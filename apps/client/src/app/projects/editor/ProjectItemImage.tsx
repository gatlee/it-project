import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { Upload } from 'react-bootstrap-icons';
import './ProjectItemImage.css';
import { generateCloudinaryUrl } from '../../cloudinaryUtility';

interface ProjectItemImage {
  src: string;
}

const ProjectItemImage = (props: ProjectItemImage) => {
  const [imgUrl, setImgUrl] = useState(props.src);

  const handleFileDrop = async (file) => {
    const url = await generateCloudinaryUrl(file);
    setImgUrl(url);
  };

  return (
    <Dropzone
      maxFiles={1}
      multiple={false}
      onDrop={async (files) => {
        await handleFileDrop(files[0]);
      }}
      accept="image/*"
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="w-100 project-image-container">
            <Image src={imgUrl} fluid className="w-100" />
            <div className="project-image-overlay">
              <Upload className="upload-icon" />
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export { ProjectItemImage };
