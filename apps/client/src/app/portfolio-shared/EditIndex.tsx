import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { BlogPage } from '../blog/BlogPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { About } from './about/About';
import { EditContext } from './EditContext';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';
import { UserContext } from './UserContext';
import LoadingScreen from "../LoadingScreen";
import useAuth0Api from "../api/useAuth0Api";

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

  const { user } = useAuth0();
  const { getRegistrationStatus } = useAuth0Api();

  const findUser = useCallback(() => {
    if (isLoaded && registrationComplete) {
      fetch(`/api/portfolio/${user.nickname}/profile`)
        .then((r) => r.json())
        .then((r) => setUser(r));
    }
  }, [setUser, user.nickname, isLoaded, registrationComplete]);

  useEffect(() => {
    getRegistrationStatus()
      .then((registrationStatus) => {
        setRegistrationComplete(registrationStatus);
        setIsLoaded(true);
      })
      .catch();
  }, []);

  useEffect(() => {
    findUser();
  }, [findUser, user, isLoaded, registrationComplete]);

  if (!isLoaded) {
    return <LoadingScreen />
  }

  if (!registrationComplete) {
    return <Redirect to='/admin' />
  }

  const footer: React.ReactNode = <PortfolioEditFooter />;

  return (
    <UserContext.Provider value={desiredUser}>
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
              <BlogPage />
            </Route>
            <Route exact path={`${path}/about`}>
              <About />
            </Route>
          </Switch>
        </FooterWrapper>
      </EditContext.Provider>
    </UserContext.Provider>
  );
};

export { EditIndex };
