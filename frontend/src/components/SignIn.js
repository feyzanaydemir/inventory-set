import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import '../assets/styles/SignIn.css';

function SignIn({ setUser }) {
  const [validationErrors, setValidationErrors] = useState(false);
  const [guestCredentials, setGuestCredentials] = useState({
    email: '',
    password: '',
  });
  const [isFetching, setIsFetching] = useState(false);
  const history = useHistory();

  const signIn = async (e, guestEmail, guestPassword) => {
    e.preventDefault();
    setIsFetching(true);
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
      const res = await axios.post('/api/auth', {
        email: guestEmail || email,
        password: guestPassword || password,
      });

      const user = { id: res.data.id, username: res.data.username };

      localStorage.setItem('IS-user', JSON.stringify(user));
      setUser({ exists: true, data: user });
      setIsFetching(false);

      history.push('/');
    } catch (err) {
      setValidationErrors(true);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const getGuestCredentails = async () => {
      const res = await axios.get('/api/users/guest');
      setGuestCredentials(res.data);
    };

    getGuestCredentails();
  }, []);

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form noValidate>
        <label>
          Email
          <input type="email" name="email"></input>
        </label>
        <label>
          Password
          <input type="password" name="password"></input>
        </label>
        {validationErrors ? (
          <span className="validation-error">Incorrect email or password</span>
        ) : null}
        {isFetching ? <CircularProgress /> : null}
        <button
          type="button"
          className="sign-in-button"
          onClick={(e) => signIn(e)}
        >
          Sign In
        </button>
        <span>Don't have an account?</span>
        <button type="button" onClick={() => history.push('/signup')}>
          Sign Up
        </button>
        <button
          type="button"
          onClick={(e) =>
            signIn(e, guestCredentials.email, guestCredentials.password)
          }
        >
          Sign in as a Guest
        </button>
      </form>
    </div>
  );
}

export default SignIn;
