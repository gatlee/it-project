import React from 'react';
import { Image } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';
import Dropzone from 'react-dropzone';
import { generateCloudinaryUrl } from '../../cloudinaryUtility';
import { css } from 'emotion';

/* CSS adapted from: https://www.w3schools.com/howto/howto_css_image_overlay_icon.asp */

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
  const projectImageContainerStyle = css({
    width: '100%',
    // If image exists, keep ratio
    // otherwise, need to fill parent div to have an overlay without image
    height: `${props.image ? 'auto' : '100%'}`,
    position: 'relative',
    backgroundColor: 'gray',
  });

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
    '-webkit-transition': '.3s ease',
    backgroundColor: 'black',
    ':hover': {
      opacity: 0.6,
      '-webkit-transition': '.3s ease',
    },
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

  const imageStyle = css({
    width: '100%',
    height: '100%',
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
        <div {...getRootProps()} className={projectImageContainerStyle}>
          <input {...getInputProps()} />
          {props.image && <Image src={props.image} className={imageStyle} />}
          <div className={projectImageOverlay}>
            <Upload className={iconStyle} />
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export { ProjectItemImage };
