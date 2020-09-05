import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PortfolioNavBar } from './PortfolioNavBar';
import { PortfolioHome } from './PortfolioHome';
import { useRouteMatch } from 'react-router-dom';
import { PortfolioPortfolio } from './PortfolioPortfolio';
import CoolBackground from '../../assets/CoolBackground.png';
import { BackgroundContainer } from '../BackgroundContainer';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { Container } from 'react-bootstrap';

const PortfolioIndex = () => {
  const { path } = useRouteMatch();

  const isEditMode = true;

  return (
    <>
      <BackgroundContainer background={CoolBackground}>
        <PortfolioWrapper>
          <div style={{ flex: 1 }}>
            <PortfolioNavBar />
            <Switch>
              <Route exact path={`${path}`}>
                <PortfolioHome />
              </Route>
              <Route exact path={`${path}/portfolio`}>
                <PortfolioPortfolio />
              </Route>
              <Route exact path={`${path}/blog`}>
                <h1>Blog</h1>
              </Route>
              <Route exact path={`${path}/about`}>
                <h1>About</h1>
              </Route>
            </Switch>
          </div>
          {isEditMode && <PortfolioEditFooter />}
        </PortfolioWrapper>
      </BackgroundContainer>
    </>
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
