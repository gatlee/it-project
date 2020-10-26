import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';
import Dropzone from 'react-dropzone';
import { css } from 'emotion';
import { generateCloudinaryUrl } from '../cloudinaryUtility';
import { EditContext } from '../portfolio-shared/EditContext';
import { AVATAR_WIDTH } from './HomeConstants';

/* CSS adapted from: https://www.w3schools.com/howto/howto_css_image_overlay_icon.asp */

interface HomeAvatar {
  onImageChange: (image: string) => void;
  image: string;
}

const HomeAvatar = (props: HomeAvatar) => {
  const editMode = useContext(EditContext);

  const handleFileDrop = async (file) => {
    const imageUrl = await generateCloudinaryUrl(file);
    props.onImageChange(imageUrl);
  };

  /* Container needed to position the overlay. Adjust the width as needed */
  const projectImageContainerStyle = css({
    width: '100%',
    height: '100%',
    maxWidth: `${AVATAR_WIDTH}px`,
    // If image exists, keep ratio
    // otherwise, need to fill parent div to have an overlay without image
    position: 'relative',
    outline: 'none',
    userSelect: 'none',
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
    borderRadius: '50%',
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

  // To render instead of image on empty profile picture
  const FallbackAvatar = () => (
    <div
      className={css({
        width: `${AVATAR_WIDTH}px`,
        height: `${AVATAR_WIDTH}px`,
        background: 'gray',
        borderRadius: '50%',
      })}
    />
  );

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
        <div {...getRootProps()} className={css({ outline: 'none' })}>
          <div className={projectImageContainerStyle + ' mx-auto'}>
            {props.image ? (
              <Image
                fluid
                className="shadow-lg"
                roundedCircle={true}
                src={props.image}
              />
            ) : (
              <FallbackAvatar />
            )}

            {editMode && (
              <div className={projectImageOverlay}>
                <input {...getInputProps()} />
                <Upload className={iconStyle} />
              </div>
            )}
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export { HomeAvatar };
