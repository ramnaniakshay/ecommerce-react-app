
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../CSS/navBar.css"

function NavBar() {
  const cartItemsCount = useSelector(state => state.cart.items.length);

  return (
    <nav>
      <Link to="/checkout">Cart ({cartItemsCount})</Link>
    </nav>
  );
}

export default NavBar;
