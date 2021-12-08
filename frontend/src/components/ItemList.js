import axios from 'axios';
import '../assets/styles/ItemList.css';

function ItemList({ array, setState, setSelectedItem, setShowItem }) {
  const deleteItemCall = async (index, id) => {
    const arr = [...array[1]];

    arr.splice(index, 1);

    setState(arr);

    await axios.delete(`/api/items/${id}`);
  };

  return (
    <div className={array[0] === 'search' ? 'search-results' : 'recent-items'}>
      <h1>{array[0] === 'search' ? 'Search Results' : 'Recent Items'}</h1>
      <div className="item-container">
        {array[1]?.length > 0 ? (
          array[1].map((elem, index) => (
            <div key={index} className="item">
              <h2>{elem.name}</h2>
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
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(elem);
                    setShowItem(true);
                  }}
                >
                  ✎
                </button>
                <button
                  type="button"
                  onClick={() => deleteItemCall(index, elem._id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>. . .</div>
        )}
      </div>
    </div>
  );
}

export default ItemList;
