import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { BlogPage } from '../blog/BlogPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { About } from './about/About';
import { EditContext } from './EditContext';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';
import { UserContext } from './UserContext';

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

  const { user } = useAuth0();
  const findUser = useCallback(() => {
    fetch(`/api/portfolio/${user.nickname}/profile`)
      .then((r) => r.json())
      .then((r) => setUser(r));
  }, [setUser, user.nickname]);

  useEffect(() => {
    findUser();
  }, [findUser, user]);

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
