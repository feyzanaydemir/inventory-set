import axios from 'axios';
import { Edit, Delete, Air } from '@mui/icons-material';
import '../assets/styles/ItemList.css';

function ItemList({ items, setSelectedItem, setShowItem }) {
  const deleteItem = async (id) => {
    await axios.delete(`/api/items/${id}`);
    window.location.reload();
  };

  return (
    <div
      className={items.type === 'search' ? 'search-results' : 'recent-items'}
    >
      <h1>{items.type === 'search' ? 'Search Results' : 'Recent Items'}</h1>
      <div className="item-container">
        {items.list?.length > 0 ? (
          items.list.map((elem, index) => (
            <div key={index} className="item">
              <div>
                <h2>{elem.name} </h2>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(elem);
                      setShowItem(true);
                    }}
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button type="button" onClick={() => deleteItem(elem._id)}>
                    <Delete fontSize="small" />
                  </button>
                </div>
              </div>
              <span>
                <strong>Brand:</strong> {elem.brand}
              </span>
              <span>
                <strong>Price:</strong> ${elem.price}
              </span>
              <span>
                <strong>Quantity:</strong> {elem.quantity}
              </span>
              <span>
                <strong>Added at:</strong> {elem.createdAt}
              </span>
            </div>
          ))
        ) : (
          <Air fontSize="large" className="empty" />
        )}
      </div>
    </div>
  );
}

export default ItemList;
