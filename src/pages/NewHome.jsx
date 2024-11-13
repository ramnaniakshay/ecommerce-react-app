import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../redux/cartSlice'; 
import '../CSS/NewHome.css'

function NewHome() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(['all', ...data]); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-page">
      <h1>Products</h1>
      <div className="category-filter">
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category.name} value={category.name} selected={selectedCategory === category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}> 
            Add to Cart
            </button>
          </div>
        ))}
      </div>

      <ul className="pagination">
        {Array(Math.ceil(filteredProducts.length / productsPerPage))
          .fill()
          .map((_, index) => (
            <li key={index + 1}>
              <button onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default NewHome;

