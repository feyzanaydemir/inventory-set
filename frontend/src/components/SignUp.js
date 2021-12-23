import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import '../assets/styles/SignUp.css';

function SignUp({ setUser }) {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState([
    false,
    false,
    false,
    false,
  ]);

  const signUp = async (e) => {
    setIsFetching(true);
    e.preventDefault();

    const res = await axios.post('/api/users', {
      firstname: document.querySelector('input[name="firstname"]').value,
      lastname: document.querySelector('input[name="lastname"]').value,
      email: document.querySelector('input[name="email"]').value,
      password: document.querySelector('input[name="password"]').value,
    });

    // If validation fails, response will be an array of errors
    if (Array.isArray(res.data)) {
      setIsFetching(false);
      setValidationErrors([
        res.data.includes('firstname'),
        res.data.includes('lastname'),
        res.data.includes('email'),
        res.data.includes('password'),
      ]);
    } else {
      const user = { id: res.data.id, username: res.data.username };

      localStorage.setItem('IS-user', JSON.stringify(user));
      setUser({ exists: true, data: user });
      setIsFetching(false);

      history.push('/');
    }
  };

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form noValidate onSubmit={signUp}>
        <label>
          Firstname
          <input
            type="text"
            name="firstname"
            className={validationErrors[0] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <ul>
          <li>Between 2 and 12 characters</li>
        </ul>
        <label>
          Lastname
          <input
            type="text"
            name="lastname"
            className={validationErrors[1] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <ul>
          <li>Between 2 and 12 characters</li>
        </ul>
        <label>
          Email
          <input
            type="email"
            name="email"
            className={validationErrors[2] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            className={validationErrors[3] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <ul>
          <li>Minimum 8 characters</li>
          <li>Minimum 1 lowercase letter</li>
          <li>Minimum 1 uppercase letter</li>
          <li>Minimum 1 digit</li>
        </ul>
        {isFetching ? <CircularProgress /> : null}
        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
        <span>Already have an account?</span>
        <button type="button" onClick={() => history.push('/signin')}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignUp;
