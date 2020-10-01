import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { Upload } from 'react-bootstrap-icons';
import './ProjectItemimage.css';
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
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <div className="project-image-container">
              <Image src={imgUrl} fluid className="w-100" />
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
