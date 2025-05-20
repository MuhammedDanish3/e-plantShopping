import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';

function ProductList({ plantsArray }) {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <h2>Total Items in Cart: {totalQuantity}</h2>
      <div className="product-grid">
        {plantsArray.map((plant, index) => (
          <div key={index} className="product-card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p>{plant.cost}</p>
            <button 
              onClick={() => handleAddToCart(plant)} 
              disabled={!!addedToCart[plant.name]}
            >
              {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
