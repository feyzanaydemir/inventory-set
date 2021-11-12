import { useState } from 'react';
import axios from 'axios';
import '../assets/styles/ItemDetails.css';

function ItemDetails({ categories, setShowItem, selectedItem }) {
  const [validationErrors, setValidationErrors] = useState(true);

  const saveItemCall = async (e) => {
    e.preventDefault();

    const item = {
      name: document.querySelector('form').name.value,
      brand: document.querySelector('form').brand.value,
      category: document.querySelector('form').category.value,
      newCategory: document.querySelector('form').newCategory.value,
      price: document.querySelector('form').price.value,
      quantity: document.querySelector('form').quantity.value,
    };

    try {
      Object.keys(selectedItem).length === 0
        ? await axios.post('api/items', item)
        : await axios.put(`api/items/${selectedItem._id}`, item);

      window.location.reload();
    } catch (err) {
      setValidationErrors(false);
    }
  };

  return (
    <div className="item-details">
      <h1>Item</h1>
      <form noValidate onSubmit={saveItemCall}>
        <label>
          Name
          <input
            type="text"
            name="name"
            defaultValue={selectedItem ? selectedItem.name : ''}
          ></input>
        </label>
        <label>
          Brand
          <input
            type="text"
            name="brand"
            defaultValue={selectedItem ? selectedItem.brand : ''}
          ></input>
        </label>
        <label>
          Category
          <h2>Select or add a category</h2>
          <div>
            {categories?.length > 0 ? (
              <select
                name="category"
                defaultValue={selectedItem ? selectedItem.category : 'default'}
              >
                <option value="default">---List---</option>
                {categories.map((elem, index) => (
                  <option key={index} value={elem.name}>
                    {elem.name}
                  </option>
                ))}
              </select>
            ) : null}
            <span>or</span>
            <input
              type="text"
              name="newCategory"
              className="new-category"
              onChange={() =>
                (document.querySelector('form').category.value = 'default')
              }
            ></input>
          </div>
        </label>
        <label>
          Price
          <div>
            $
            <input
              type="text"
              name="price"
              className="price"
              defaultValue={selectedItem ? selectedItem.price : ''}
            ></input>
          </div>
        </label>
        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            className="quantity"
            defaultValue={selectedItem ? selectedItem.quantity : ''}
          ></input>
        </label>
        {!validationErrors ? (
          <span className="validation-error">Please fill out all fields</span>
        ) : null}
        <div className="buttons">
          <button type="submit">Save</button>
          <button
            type="reset"
            className="cancel-button"
            onClick={() => setShowItem(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemDetails;