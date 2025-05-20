import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const cost = parseFloat(item.cost.substring(1));
      return total + cost * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: {item.cost}</p>
          <p>Subtotal: ${calculateTotalCost(item)}</p>
          <button onClick={() => handleDecrement(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleRemove(item)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${calculateTotalAmount()}</h3>
      <button onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
}

export default CartItem;
