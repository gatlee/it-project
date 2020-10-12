import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { Upload } from 'react-bootstrap-icons';
import { generateCloudinaryUrl } from '../../cloudinaryUtility';
import { css } from 'emotion';

interface ProjectItemImage {
  onImageChange: (image: string) => void;
  image: string;
}

const ProjectItemImage = (props: ProjectItemImage) => {
  const handleFileDrop = async (file) => {
    const imageUrl = await generateCloudinaryUrl(file);
    props.onImageChange(imageUrl);
  };

  /* Container needed to position the overlay. Adjust the width as needed */
  const projectImageContainerStyle = css({ position: 'relative' });

  /* The overlay effect (full height and width) - lays on top of the container and over the image */
  const projectImageOverlay = css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 0,
    backgroundColor: 'gray',
    ':hover': { opacity: 0.6, transiton: 'opacity 350ms ease' },
  });

  const iconStyle = css({
    color: 'White',
    fontSize: '100px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    textAlign: 'center',
  });

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
          <div className={'w-100 ' + projectImageContainerStyle}>
            <Image src={props.image} fluid className="w-100" />
            <div className={projectImageOverlay}>
              <Upload className={iconStyle} />
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export { ProjectItemImage };
