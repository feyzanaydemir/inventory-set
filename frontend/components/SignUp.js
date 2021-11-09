import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/SignUp.css';

function SignUp({ setUser }) {
  const history = useHistory();
  const [validationErrors, setValidationErrors] = useState([
    false,
    false,
    false,
    false,
  ]);

  const signUpCall = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/users', {
      firstname: document.querySelector('input[name="firstname"]').value,
      lastname: document.querySelector('input[name="lastname"]').value,
      email: document.querySelector('input[name="email"]').value,
      password: document.querySelector('input[name="password"]').value,
    });

    if (Array.isArray(res.data)) {
      setValidationErrors([
        res.data.includes('firstname'),
        res.data.includes('lastname'),
        res.data.includes('email'),
        res.data.includes('password'),
      ]);
    } else {
      setUser([true, `${res.data.firstname} ${res.data.lastname}`]);

      localStorage.setItem(
        'IMusername',
        `${res.data.firstname} ${res.data.lastname}`
      );

      history.push('/');
    }
  };

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form noValidate onSubmit={signUpCall}>
        <label>
          Firstname
          <input
            type="text"
            name="firstname"
            className={validationErrors[0] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <ul>
          <li>Required</li>
          <li>Between 2 and 10 characters</li>
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
          <li>Required</li>
          <li>Between 2 and 10 characters</li>
        </ul>
        <label>
          Email
          <input
            type="email"
            name="email"
            className={validationErrors[2] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <ul>
          <li>Required</li>
        </ul>
        <label>
          Password
          <input
            type="password"
            name="password"
            className={validationErrors[3] ? 'invalid' : 'valid'}
          ></input>
        </label>
        <ul>
          <li>Required</li>
          <li>Between 8 and 16 characters</li>
          <li>Minimum 1 lowercase letter</li>
          <li>Minimum 1 lowercase letter</li>
          <li>Minimum 1 digit</li>
        </ul>
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
