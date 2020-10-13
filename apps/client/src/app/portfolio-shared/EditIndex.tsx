import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import useAuth0Api from '../api/useAuth0Api';
import { BlogPage } from '../blog/BlogPage';
import { ContentPage } from '../content/ContentPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { About } from './about/About';
import { EditContext } from './EditContext';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';
import { UserContext } from './UserContext';
import { Container } from 'react-bootstrap';

const EditIndex = () => {
  const isEditMode = true;
  const { path } = useRouteMatch();
  const [desiredUser, setUser] = useState({
    username: '',
    email: '',
    name: '',
    dateJoined: undefined,
    description: '',
  });

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { getAccessTokenSilently } = useAuth0();
  const { getRegistrationStatusWithCache } = useAuth0Api();

  const findUser = useCallback(async () => {
    if (isLoaded && registrationComplete) {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/portfolio/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const js = await response.json();
      setUser(js);
    }
  }, [setUser, isLoaded, registrationComplete, getAccessTokenSilently]);

  useEffect(() => {
    getRegistrationStatusWithCache()
      .then((registrationStatus) => {
        setRegistrationComplete(registrationStatus);
        setIsLoaded(true);
      })
      .catch((e) => console.log(e));
  }, [getRegistrationStatusWithCache]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  if (!isLoaded) {
    return null;
  }

  if (!registrationComplete) {
    return <Redirect to="/admin" />;
  }

  const footer: React.ReactNode = <PortfolioEditFooter />;

  return (
    <UserContext.Provider value={desiredUser}>
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
    </UserContext.Provider>
  );
};

export { EditIndex };
