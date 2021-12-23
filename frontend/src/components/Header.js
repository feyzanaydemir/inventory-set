import axios from 'axios';
import gitHubMark from '../assets/github-mark.png';

function Header({ user }) {
  const signOut = async () => {
    await axios.delete('/api/auth/');

    localStorage.clear();
    window.location.reload();
  };

  return (
    <header>
      <a href="/">
        <h1>Inventory Set</h1>
      </a>
      <div>
        {user.exists && user.data ? <h2>{user.data.username}</h2> : null}
        {user.exists ? <button onClick={signOut}>Sign Out</button> : null}
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
