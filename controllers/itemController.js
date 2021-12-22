const { setFilter, setMongoFilter } = require('../modules/itemModule');
const { format } = require('date-fns');
const Item = require('../models/Item');

module.exports.createItem = async (req, res) => {
  if (req.body.category === 'default' && !req.body.newCategory) {
    return res.status(400).json('Missing category.');
  }

  let item = formatItemBody(req.body);
  item.userId = req.body.userId;
  item.createdAt = format(new Date(), 'HH:mm, dd/MM/yyyy');

  try {
    await Item.create(item);

    res.status(201).json('Successfully created new item.');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.editItem = async (req, res) => {
  if (req.body.category === 'default' && !req.body.newCategory) {
    return res.status(400).json('Missing category.');
  }

  let item = formatItemBody(req.body);

  try {
    await Item.findByIdAndUpdate(req.params.id, item, { runValidators: true });

    res.status(200).json('Successfully updated item.');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json('Successfully deleted item.');
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create filters with correct options and item counts
module.exports.readItemFilters = async (req, res) => {
  try {
    const allItems = await Item.find({ userId: req.params.userId }).lean();

    // Find the number of items included in a specific filter
    const [categories, brands, prices] = await Promise.all([
      setFilter(allItems, 'category'),
      setFilter(allItems, 'brand'),
      setFilter(allItems, 'prices'),
    ]);

    res.status(200).json({ categories, brands, prices });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.readRecentItems = async (req, res) => {
  try {
    const recentItems = await Item.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json(recentItems);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.findItems = async (req, res) => {
  // Get suitable MongoDB search query
  const mongoFilter = setMongoFilter(req.body.filters);
  const orArray = [
    { name: { $regex: `${req.query.input}`, $options: 'i' } },
    { brand: { $regex: `${req.query.input}`, $options: 'i' } },
  ];

  try {
    let items;

    // Searchbar input is not empty
    if (req.query.input) {
      items =
        Object.keys(req.body.filters).length > 0
          ? await Item.find({
              userId: req.body.userId,
              $or: orArray,
              $and: mongoFilter,
            }).lean()
          : await Item.find({
              userId: req.body.userId,
              $or: orArray,
            }).lean();

      // Searchbar input is empty, only filtering search
    } else {
      items = await Item.find({ $and: mongoFilter }).lean();
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

const formatItemBody = (item) => {
  if (item.category === 'default') {
    // Set user defined category field
    item.category = item.newCategory;
  }

  // Format decimals with "."
  if (item.price.includes(',')) {
    item.price = item.price.replace(',', '.');
  }

  if (item.quantity.includes(',')) {
    item.quantity = item.quantity.replace(',', '.');
  }

  return {
    name: item.name,
    brand: item.brand,
    category: item.category,
    price: item.price,
    quantity: Number(item.quantity),
  };
};
