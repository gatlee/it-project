import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';
import Dropzone from 'react-dropzone';
import { css } from 'emotion';
import { generateCloudinaryUrl } from '../cloudinaryUtility';
import { EditContext } from '../portfolio-shared/EditContext';
import { AVATAR_WIDTH } from './HomeConstants';
import { updateProfilePicture } from '../admin/AdminUtils';
import { UserContext } from '../portfolio-shared/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

/* CSS adapted from: https://www.w3schools.com/howto/howto_css_image_overlay_icon.asp */

interface HomeAvatar {
  image: string;
}

const HomeAvatar = (props: HomeAvatar) => {
  const editMode = useContext(EditContext);
  const { setProfilePicture } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

  const handleFileDrop = async (file) => {
    const imageUrl = await generateCloudinaryUrl(file);
    handleImageChange(imageUrl);
  };

  const handleImageChange = async (newImage: string) => {
    // Crop image using Cloudinary Transformations before setting it
    // Do note: It's quite powerful, there are transformations where it
    // finds your face and crops it
    //
    // For now now just getting it rudimentary, I do not want to deal with the library this late
    const secondLastSlash = newImage.lastIndexOf(
      '/',
      newImage.lastIndexOf('/') - 1
    );

    const croppedImage = [
      newImage.slice(0, secondLastSlash),
      `/c_lfill,h_${AVATAR_WIDTH},w_${AVATAR_WIDTH}/`,
      newImage.slice(secondLastSlash),
    ].join('');

    updateProfilePicture(croppedImage, getAccessTokenSilently).then(
      (response) => {
        if (response.ok) {
          setProfilePicture(croppedImage);
        }
        console.log(response);
      }
    );
  };

  /* Container needed to position the overlay. Adjust the width as needed */
  const projectImageContainerStyle = css({
    width: `${AVATAR_WIDTH}px`,
    height: `${AVATAR_WIDTH}px`,
    position: 'relative',
    outline: 'none',
    userSelect: 'none',
    borderRadius: '50%',
    background: 'gray',
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
        <div
          {...getRootProps()}
          className={css({ outline: 'none', userSelect: 'none' })}
        >
          <div className={projectImageContainerStyle + ' mx-auto'}>
            {props.image && (
              <Image
                fluid
                className="shadow-lg"
                roundedCircle={true}
                src={props.image}
              />
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
