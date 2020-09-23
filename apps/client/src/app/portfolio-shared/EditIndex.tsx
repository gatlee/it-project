import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { FooterWrapper } from '../layout/FooterWrapper';
import { About } from './about/About';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';
import { EditContext } from './EditContext';

const EditIndex = () => {
  const isEditMode = true;
  const { path } = useRouteMatch();
  console.log(path);

  const footer: React.ReactNode = <PortfolioEditFooter />;

  return (
    <EditContext.Provider value={true}>
      <FooterWrapper footer={footer} hidden={!isEditMode}>
        <PortfolioNavBar />
        <Switch>
          <Route exact path={`${path}`}>
            <PortfolioHome />
          </Route>
          <Route exact path={`${path}/projects`}>
            <ProjectPage />
          </Route>
          <Route exact path={`${path}/blog`}>
            <h1>Blog</h1>
          </Route>
          <Route exact path={`${path}/about`}>
            <About />
          </Route>
        </Switch>
      </FooterWrapper>
    </EditContext.Provider>
  );
};

export { EditIndex };
