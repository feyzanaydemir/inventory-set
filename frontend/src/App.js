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
  const [user, setUser] = useState([
    false,
    localStorage.getItem('IMusername')
      ? localStorage.getItem('IMusername')
      : '',
  ]);

  useEffect(() => {
    // Check if there is a valid user signed in
    const checkUser = async () => {
      setIsFetching(true);

      const res = await axios.get('/api/users');

      // If username in localStorage is valid
      if (res.data?.includes('Valid')) {
        setUser((u) => [true, u[1]]);

        // If username in localStorage is non existed or invalid
      } else {
        setUser((u) => [false, u[1]]);
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
            {user[0] ? (
              <Home />
            ) : !isFetching ? (
              <Redirect to="/signin" />
            ) : null}
          </Route>
          <Route exact path="/signin">
            {!user[0] && !isFetching ? (
              <SignIn setUser={setUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signup">
            {!user[0] && !isFetching ? (
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
