import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { PortfolioNavBar } from './PortfolioNavBar';
import { PortfolioHome } from './PortfolioHome';
import { useRouteMatch } from 'react-router-dom';
import { PortfolioItemList } from './PortfolioItemList';
import CoolBackground from '../../assets/CoolBackground.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { About } from './about/About';
import { NotFound } from '../NotFound';

const PortfolioIndex = () => {
  const [isEditMode, setEditMode] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { path } = useRouteMatch();
  const { id } = useParams();

  const handleViewPublic = () => {
    setEditMode(false);
  };

  const findUser = () => {
    fetch(`/api/portfolio/${id}/profile`)
      .then((r) => {
        // User not found, we should redirect
        if (r.status !== 200) {
          setRedirect(true);
        }
      })
      .then(() => setLoaded(true));
  };

  useEffect(() => {
    findUser();
  });

  if (redirect) {
    return <Route component={NotFound} />;
  } else if (!loaded) {
    return null;
  }

  return (
    <BackgroundContainer background={CoolBackground}>
      <PortfolioWrapper>
        <div style={{ flex: 1 }}>
          <PortfolioNavBar />
          <Switch>
            <Route exact path={`${path}`}>
              <PortfolioHome />
            </Route>
            <Route exact path={`${path}/portfolio`}>
              <PortfolioItemList />
            </Route>
            <Route exact path={`${path}/blog`}>
              <h1>Blog</h1>
            </Route>
            <Route exact path={`${path}/about`}>
              <About editable={isEditMode} />
            </Route>
          </Switch>
        </div>
        {isEditMode && (
          <PortfolioEditFooter handleViewPublic={handleViewPublic} />
        )}
      </PortfolioWrapper>
    </BackgroundContainer>
  );
};

interface PortfolioWrapper {
  children: React.ReactNode;
}

const PortfolioWrapper = (props: PortfolioWrapper) => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      {props.children}
    </div>
  );
};

export { PortfolioIndex };
