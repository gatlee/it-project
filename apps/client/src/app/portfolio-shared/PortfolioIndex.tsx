import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PortfolioNavBar } from './PortfolioNavBar';
import { PortfolioHome } from './PortfolioHome';
import { useRouteMatch } from 'react-router-dom';
import { PortfolioPortfolio } from './PortfolioPortfolio';

const PortfolioIndex = () => {
  const { path } = useRouteMatch();

  return (
    <>
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
    </>
  );
};

export { PortfolioIndex };
