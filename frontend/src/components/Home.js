import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

function Home({ user }) {
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showItem, setShowItem] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const getFilters = async () => {
    setIsFetching(true);
    const res = await axios.get(`/api/items/filters/${user.id}`);
    setFilters(res.data);
  };
  const getRecentItems = async () => {
    const res = await axios.get(`/api/items/recent/${user.id}`);
    setRecentItems(res.data);
    setIsFetching(false);
  };

  useEffect(() => {
    getFilters();
    getRecentItems();
  }, []);

  if (!isFetching && showItem) {
    return (
      <ItemDetails
        categories={filters.categories}
        setShowItem={setShowItem}
        selectedItem={selectedItem}
      />
    );
  }

  if (!isFetching && !showItem) {
    return (
      <main>
        <h3
          style={{
            display: user.username === 'Jane Doe' ? 'block' : 'none',
          }}
        >
          * Please sign in with a real account to add and edit items. *
        </h3>
        <button
          className="new-item-button"
          type="button"
          onClick={() => {
            setSelectedItem({});
            setShowItem(true);
          }}
        >
          + New Item
        </button>
        <Searchbar filters={filters} setSearchResults={setSearchResults} />
        <ItemList
          items={{ type: 'search', list: searchResults }}
          setSelectedItem={setSelectedItem}
          setShowItem={setShowItem}
        />
        <ItemList
          items={{ type: 'recent', list: recentItems }}
          setSelectedItem={setSelectedItem}
          setShowItem={setShowItem}
        />
      </main>
    );
  }

  return <CircularProgress className="loading" fontSize="large" />;
}

export default Home;
