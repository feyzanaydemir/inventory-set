const Item = require('../models/Item');

// Set categories, brands and prices filters
const setFilter = async (items, type) => {
  // Set prices filter
  if (type === 'prices') {
    return setPrices(items);
  }

  // Set categories or brands filters
  // Create an array from the names of the filter elements
  const filterElements = items.reduce((arr, elem) => {
    // Don't push the same category name twice
    if (type === 'category' && !arr.includes(elem.category)) {
      arr.push(elem.category);

      // Don't push the same brand name twice
    } else if (type === 'brand' && !arr.includes(elem.brand)) {
      arr.push(elem.brand);
    }

    return arr;
  }, []);

  // Find how many items have a certain category of brand name
  for (let i = 0; i < filterElements.length; i++) {
    const arr =
      type === 'category'
        ? await Item.find({ category: filterElements[i] })
        : await Item.find({ brand: filterElements[i] });

    // Set category or brand name and item count
    filterElements[i] = { name: filterElements[i], count: arr.length };
  }

  return filterElements;
};

// Set prices filter
const setPrices = (items) => {
  return [
    { name: 'Under $25', count: setPriceRange(items, { lower: 25 }).length },
    {
      name: '$25 to $50',
      count: setPriceRange(items, { lower: 50, greater: 25 }).length,
    },
    {
      name: '$50 to $100',
      count: setPriceRange(items, { lower: 100, greater: 50 }).length,
    },
    {
      name: '$100 to $200',
      count: setPriceRange(items, { lower: 200, greater: 100 }).length,
    },
    {
      name: '$200 and above',
      count: setPriceRange(items, { greater: 200 }).length,
    },
  ];
};

// Find the items that are in a certain price range
const setPriceRange = (items, range) => {
  let arr = [];

  // Every item with a price equal or cheaper than $25
  if (!range.greater) {
    items.forEach((elem) => {
      if (elem.price <= 25) {
        arr.push(elem);
      }
    });

    // Every item with a price equal or expensive than $200
  } else if (!range.lower) {
    items.forEach((elem) => {
      if (elem.price >= 200) {
        arr.push(elem);
      }
    });

    // Every item within a specific price range
  } else {
    items.forEach((elem) => {
      if (elem.price <= range.lower && elem.price >= range.greater) {
        arr.push(elem);
      }
    });
  }

  return arr;
};

// Create a MongoDB search query
const setMongoFilter = (array) => {
  let categories = { $or: [] };
  let brands = { $or: [] };
  let prices = { $or: [] };

  for (let i = 0; i < array.categories?.length; i++) {
    categories.$or.push({ category: array.categories[i] });
  }

  for (let i = 0; i < array.brands?.length; i++) {
    brands.$or.push({ brand: array.brands[i] });
  }

  for (let i = 0; i < array.prices?.length; i++) {
    if (array.prices[i] === 'Under $25') {
      prices.$or.push({ price: { $lte: 25 } });
    } else if (array.prices[i] === '$25 to $50') {
      prices.$or.push({ price: { $lte: 50, $gte: 25 } });
    } else if (array.prices[i] === '$50 to $100') {
      prices.$or.push({ price: { $lte: 100, $gte: 50 } });
    } else if (array.prices[i] === '$100 to $200') {
      prices.$or.push({ price: { $lte: 200, $gte: 100 } });
    } else if (array.prices[i] === '$200 and above') {
      prices.$or.push({ price: { $gte: 200 } });
    }
  }

  // Return the query with non-empty filters
  return [categories, brands, prices].filter((arr) => {
    if (arr.$or.length > 0) {
      return arr;
    }
  });
};

module.exports = { setFilter, setMongoFilter };
