import React, { useContext } from 'react';
import Jilden from '../../assets/landscape.png';
import Bean from '../../assets/Bean.png';
import Silva from '../../assets/Silva.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { UserContext } from './UserContext';
import { UserTheme } from '@pure-and-lazy/api-interfaces';

interface ThemedBackgroundContainer {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ThemedBackgroundContainer = (props: ThemedBackgroundContainer) => {
  const { theme } = useContext(UserContext);
  let image;
  if (theme === UserTheme.JILDEN) {
    image = Jilden;
  } else if (theme === UserTheme.BEAN) image = Bean;
  else {
    image = Silva;
  }

  return (
    <BackgroundContainer
      background={image}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${image})`,
        ...props.style,
      }}
    >
      {' '}
      {props.children}
    </BackgroundContainer>
  );
};

export { ThemedBackgroundContainer };
