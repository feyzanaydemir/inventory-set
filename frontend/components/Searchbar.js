import { useState, useRef } from 'react';
import Filter from './Filter';
import axios from 'axios';
import '../assets/styles/Searchbar.css';

function Searchbar({ filters, setSearchResults }) {
  const [showFilters, setShowFilters] = useState(false);
  const searchInput = useRef();

  const getSelections = (field) => {
    return Array.from(
      document.querySelectorAll(`input[field='${field}']`)
    ).reduce((filtered, elem) => {
      if (elem.checked) {
        return filtered.concat(elem.name);
      }

      return filtered;
    }, []);
  };

  const searchItemsCall = async (e) => {
    e.preventDefault();

    let categories, brands, prices;
    let filters = {};

    if (showFilters) {
      categories = getSelections('categories');
      brands = getSelections('brands');
      prices = getSelections('prices');

      if (categories.length > 0) {
        filters.categories = categories;
      }

      if (brands.length > 0) {
        filters.brands = brands;
      }

      if (prices.length > 0) {
        filters.prices = prices;
      }
    }

    if (searchInput.current.value || Object.keys(filters).length !== 0) {
      const res = await axios.post(
        `/api/items/search?input=${searchInput.current.value}`,
        {
          filters,
        }
      );

      setSearchResults(res.data);
      setShowFilters(false);
    }
  };

  return (
    <form noValidate className="searchbar" onSubmit={searchItemsCall}>
      <input
        type="text"
        placeholder="Find something..."
        ref={searchInput}
        className="search-input"
      ></input>
      <div className="buttons">
        <button
          type="button"
          className="filters-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
        <button type="submit">Search</button>
      </div>
      <div className="filter-container">
        {showFilters ? (
          <>
            <Filter array={filters.categories} type="categories" />
            <Filter array={filters.brands} type="brands" />
            <Filter array={filters.prices} type="prices" />
          </>
        ) : null}
      </div>
    </form>
  );
}

export default Searchbar;
