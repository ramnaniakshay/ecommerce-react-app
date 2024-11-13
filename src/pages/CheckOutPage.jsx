
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Continue Shopping</Link></p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.thumbnail} alt={item.title} className="checkout-product-image" />
                    {item.title}
                  </td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-summary">
            <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
            <button className="checkout-button">Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
