import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Err from './components/Err';
import axios from 'axios';
import './assets/styles/reset.css';
import './assets/styles/App.css';

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState({
    exists: false,
    data: JSON.parse(localStorage.getItem('IS-user')) || {},
  });

  useEffect(() => {
    const checkUser = async () => {
      setIsFetching(true);

      const res = await axios.get('/api/users');

      if (res.data === 'Valid user') {
        setUser({ exists: true, data: user.data });
      } else {
        setUser({ exists: false, data: user.data });
      }

      setIsFetching(false);
    };

    checkUser();
  }, []);

  return (
    <>
      <Header user={user} />
      <Router>
        <Switch>
          <Route exact path="/">
            {user.exists ? (
              <Home user={user.data} />
            ) : !isFetching ? (
              <Redirect to="/signin" />
            ) : null}
          </Route>
          <Route exact path="/signin">
            {!user.exists && !isFetching ? (
              <SignIn setUser={setUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signup">
            {!user.exists && !isFetching ? (
              <SignUp setUser={setUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*">
            <Err />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
