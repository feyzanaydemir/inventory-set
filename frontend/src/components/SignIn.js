import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/SignIn.css';

function SignIn({ setUser }) {
  const [validationErrors, setValidationErrors] = useState(false);
  const history = useHistory();

  const signInCall = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth', {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
      });

      setUser([true, `${res.data.firstname} ${res.data.lastname}`]);

      localStorage.setItem(
        'IMusername',
        `${res.data.firstname} ${res.data.lastname}`
      );

      history.push('/');
    } catch (err) {
      setValidationErrors(true);
    }
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form noValidate onSubmit={signInCall}>
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
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
        <span>Don't have an account?</span>
        <button type="button" onClick={() => history.push('/signup')}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignIn;
