import axios from 'axios';
import gitHubMark from '../assets/github-mark.png';

function Header({ user }) {
  const signOutCall = async () => {
    await axios.delete('/api/auth/');

    localStorage.removeItem('IMuser');

    window.location.reload();
  };

  return (
    <header>
      <a href="/">
        <h1>Inventory Set</h1>
      </a>
      <div>
        {user[0] && user[1] ? <h2>{user[1]}</h2> : null}
        {user[0] ? <button onClick={signOutCall}>Sign Out</button> : null}
        <a
          href="https://github.com/feyzanaydemir/inventory-set"
          target="_blank"
          rel="noreferrer"
        >
          <img src={gitHubMark} alt="GitHub logo." />
        </a>
      </div>
    </header>
  );
}

export default Header;
