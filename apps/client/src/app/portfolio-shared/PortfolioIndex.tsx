import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { BlogPage } from '../blog/BlogPage';
import { NotFound } from '../NotFound';
import { About } from './about/About';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import { ProjectPage } from './ProjectPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { PortfolioViewFooter } from './PortfolioViewFooter';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext';
import { Container } from 'react-bootstrap';

const PortfolioIndex = () => {
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    dateJoined: undefined,
    description: '',
  });
  const { path } = useRouteMatch();
  const { id } = useParams();
  const { isAuthenticated, user: authUser } = useAuth0();

  const footer: React.ReactNode = <PortfolioViewFooter />;

  const findUser = useCallback(() => {
    fetch(`/api/portfolio/${id}/profile`)
      .then((r) => {
        // User not found, we should redirect
        if (r.status !== 200) {
          setRedirect(true);
        }
        return r.json();
      })
      .then((r) => {
        setUser(r);
        setLoaded(true);
      });
  }, [setRedirect, setUser, setLoaded, id]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  if (redirect) {
    return <Route component={NotFound} />;
  } else if (!loaded) {
    return null;
  }

  return (
    <UserContext.Provider value={user}>
      <FooterWrapper
        footer={footer}
        hidden={!isAuthenticated || authUser.nickname !== user.username}
      >
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
    </UserContext.Provider>
  );
};

export { PortfolioIndex };
