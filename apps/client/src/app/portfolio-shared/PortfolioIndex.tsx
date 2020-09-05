import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PortfolioNavBar } from './PortfolioNavBar';
import { PortfolioHome } from './PortfolioHome';
import { useRouteMatch } from 'react-router-dom';
import { PortfolioPortfolio } from './PortfolioPortfolio';
import CoolBackground from '../../assets/CoolBackground.png';
import { BackgroundContainer } from '../BackgroundContainer';

const PortfolioIndex = () => {
  const { path } = useRouteMatch();

  return (
    <BackgroundContainer background={CoolBackground}>
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
    </BackgroundContainer>
  );
};

export { PortfolioIndex };
