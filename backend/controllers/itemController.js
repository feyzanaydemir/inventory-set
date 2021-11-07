const Item = require('../models/Item');
const { setFilter, setMongoFilter } = require('../modules/itemModule');
const { format } = require('date-fns');

// Create filters with correct options and item counts
module.exports.readItemFilters = async (req, res) => {
  try {
    const allItems = await Item.find({});

    // Find the number of items included in a specific filter
    const categories = await setFilter(allItems, 'category');
    const brands = await setFilter(allItems, 'brand');
    const prices = await setFilter(allItems, 'prices');

    res.status(200).json({ categories, brands, prices });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

// Get the last 10 added items
module.exports.readRecentItems = async (req, res) => {
  try {
    const allItems = await Item.find({});
    const recentItems = [...allItems].reverse().slice(0, 9);

    res.status(200).json(recentItems);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

// Create a new item
module.exports.createItem = async (req, res) => {
  if (req.body.category === 'default') {
    // Missing category field
    if (!req.body.newCategory) {
      return res.status(400).json('No category');
    }

    // Set user defined category field
    req.body.category = req.body.newCategory;
  }

  // Format decimals with "."
  if (req.body.price.includes(',')) {
    req.body.price = req.body.price.replace(',', '.');
  }

  if (req.body.quantity.includes(',')) {
    req.body.quantity = req.body.quantity.replace(',', '.');
  }

  // Create and save the new item
  try {
    await Item.create({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      quantity: Number(req.body.quantity),
      createdAt: format(new Date(), 'HH:mm, dd/MM/yyyy'),
    });

    res.status(201).json('New item added');
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

module.exports.editItem = async (req, res) => {
  if (req.body.category === 'default') {
    // Missing category field
    if (!req.body.newCategory) {
      return res.status(400).json('No category');
    }

    // Set user defined category field
    req.body.category = req.body.newCategory;
  }

  // Format decimals with "."
  if (req.body.price.includes(',')) {
    req.body.price = req.body.price.replace(',', '.');
  }

  if (req.body.quantity.includes(',')) {
    req.body.quantity = req.body.quantity.replace(',', '.');
  }

  try {
    // Update the item
    await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        quantity: Number(req.body.quantity),
      },
      { runValidators: true }
    );

    res.status(200).json('Item updated');
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

// Find by item id and delete the item
module.exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json('Item deleted');
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

// Find searched items
module.exports.findItems = async (req, res) => {
  // Get a MongoDB search query
  const mongoFilter = setMongoFilter(req.body.filters);

  try {
    let items;

    // if searchbar input is not empty
    if (req.query.input) {
      items =
        Object.keys(req.body.filters).length !== 0
          ? await Item.find({
              $or: [
                { name: { $regex: `${req.query.input}`, $options: 'i' } },
                { brand: { $regex: `${req.query.input}`, $options: 'i' } },
              ],
              $and: mongoFilter,
            })
          : await Item.find({
              $or: [
                { name: { $regex: `${req.query.input}`, $options: 'i' } },
                { brand: { $regex: `${req.query.input}`, $options: 'i' } },
              ],
            });
    } else {
      items = await Item.find({ $and: mongoFilter });
    }

    res.status(200).json(items);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};
