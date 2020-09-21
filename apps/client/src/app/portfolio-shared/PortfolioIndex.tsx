import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { FooterWrapper } from '../layout/FooterWrapper';
import { NotFound } from '../NotFound';
import { About } from './about/About';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';

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

  const footer: React.ReactNode = (
    <PortfolioEditFooter handleViewPublic={handleViewPublic} />
  );
  return (
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
          <About editable={isEditMode} />
        </Route>
      </Switch>
    </FooterWrapper>
  );
};

export { PortfolioIndex };
