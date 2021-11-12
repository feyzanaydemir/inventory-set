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
              <span>Brand: {elem.brand}</span>
              <span>Price: ${elem.price}</span>
              <span>Quantity: {elem.quantity}</span>
              <span>Added at: {elem.createdAt}</span>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(elem);
                    setShowItem(true);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteItemCall(index, elem._id)}
                >
                  X
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
