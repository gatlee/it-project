import React, { useContext } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { BlogPage } from '../blog/BlogPage';
import { ContentPage } from '../content/ContentPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { About } from './about/About';
import { EditContext } from './EditContext';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';
import { AuthContext } from '../auth/AuthContext';
import { Container } from 'react-bootstrap';

const EditIndex = () => {
  const { registrationComplete, isLoaded } = useContext(AuthContext);
  const isEditMode = true;
  const { path } = useRouteMatch();

  if (!isLoaded) {
    return null;
  }

  if (!registrationComplete) {
    return <Redirect to="/admin" />;
  }

  const footer: React.ReactNode = <PortfolioEditFooter />;

  return (
    <EditContext.Provider value={true}>
      <Container className="d-flex flex-column min-vh-100 p-0" fluid>
        <PortfolioNavBar />
        <Switch>
          <Route exact path={`${path}`}>
            <PortfolioHome />
          </Route>
          <Route exact path={`${path}/projects`}>
            <ProjectPage />
          </Route>
          <Route exact path={`${path}/blog`}>
            <BlogPage />
          </Route>
          <Route exact path={`${path}/projects/:contentID`}>
            <ContentPage />
          </Route>
          <Route exact path={`${path}/blog/:contentID`}>
            <ContentPage />
          </Route>
          <Route exact path={`${path}/about`}>
            <About />
          </Route>
        </Switch>
        <FooterWrapper footer={footer} hidden={!isEditMode} />
      </Container>
    </EditContext.Provider>
  );
};

export { EditIndex };
