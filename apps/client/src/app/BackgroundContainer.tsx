import React from 'react';

interface BackgroundContainer {
  background: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className: string;
}

const BackgroundContainer = (props: BackgroundContainer) => {
  const { background, children, style } = props;

  const combinedStyles = {
    backgroundImage: `url(${background})`,
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    ...style,
  };

  return (
    <div style={combinedStyles} className="flex-grow-1 overflow-auto">
      {children}
    </div>
  );
};

export { BackgroundContainer };
