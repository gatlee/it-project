import React from 'react';

interface BackgroundContainer {
  background: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const BackgroundContainer = (props: BackgroundContainer) => {
  const { background, children, style } = props;

  const combinedStyles = {
    backgroundImage: `url(${background})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    ...style,
  };

  return <div style={combinedStyles}>{children}</div>;
};

export { BackgroundContainer };
