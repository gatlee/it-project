import React from 'react';

interface AdminTitle {
  title: string;
  subtitle: string;
}

const AdminTitle = (props: AdminTitle) => {
  const headerStyle = {
    fontWeight: 500,
    '@media (max-width: 992px)': {
      fontSize: 48,
    },
    '@media (min-width: 992px)': {
      fontSize: 72,
    },
  };

  const subtitleStyle = {
    fontWeight: 400,
    '@media (max-width: 992px)': {
      fontSize: 16,
    },
    '@media (min-width: 992px)': {
      fontSize: 24,
    },
  };

  return (
    <>
      <h2 css={headerStyle}>{props.title}</h2>
      <p css={subtitleStyle}>{props.subtitle}</p>
    </>
  );
};

export { AdminTitle };
