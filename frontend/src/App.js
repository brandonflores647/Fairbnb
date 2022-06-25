import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';

import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotFormPage from './components/SpotFormPage';
import SpotsContainer from './components/SpotsContainer';
import SpotDetail from './components/SpotDetail';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded ? (
    <>
      <Navigation loaded={loaded} />
      <Switch>
        <Route exact path="/">
          <h1>cool app</h1>
          <SpotsContainer />
        </Route>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/spots/new">
          <SpotFormPage />
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotDetail />
        </Route>
      </Switch>
    </>
    ) : null
}

export default App;
