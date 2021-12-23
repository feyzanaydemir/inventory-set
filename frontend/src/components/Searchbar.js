import { useState, useRef } from 'react';
import Filter from './Filter';
import axios from 'axios';
import { FilterAlt, Search } from '@mui/icons-material';
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

  const searchItems = async (e) => {
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
          userId: JSON.parse(localStorage.getItem('IS-user')).id,
          filters,
        }
      );

      setSearchResults(res.data);
      setShowFilters(false);
    }
  };

  return (
    <form noValidate className="search-form" onSubmit={searchItems}>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Find something..."
          ref={searchInput}
        ></input>
        <div className="buttons">
          <button
            type="button"
            className="filters-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterAlt fontSize="small" />
            Filters
          </button>
          <button type="submit">
            <Search fontSize="small" />
            Search
          </button>
        </div>
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
