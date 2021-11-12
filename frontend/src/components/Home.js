import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import axios from 'axios';

function Home() {
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showItem, setShowItem] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getFilters = async () => {
      setIsFetching(true);

      const res = await axios.get('/api/items/filters');

      setFilters(res.data);
    };

    getFilters();
  }, []);

  useEffect(() => {
    const getRecentItems = async () => {
      const res = await axios.get('/api/items/recent');

      setRecentItems(res.data);
      setIsFetching(false);
    };

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
        <button
          className="new-item-button"
          type="button"
          onClick={() => setShowItem(true)}
        >
          + New Item
        </button>
        <Searchbar filters={filters} setSearchResults={setSearchResults} />
        <ItemList
          array={['search', searchResults]}
          setState={setSearchResults}
          setSelectedItem={setSelectedItem}
          setShowItem={setShowItem}
        />
        <ItemList
          array={['recent', recentItems]}
          setState={setRecentItems}
          setSelectedItem={setSelectedItem}
          setShowItem={setShowItem}
        />
      </main>
    );
  }

  return <span className="loading">Loading</span>;
}

export default Home;
