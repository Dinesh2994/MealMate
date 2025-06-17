// src/pages/ExploreRecipes.jsx

import React, { useState, useEffect } from 'react';
import './ExploreRecipes.css';
import { useNavigate } from 'react-router-dom';

const ExploreRecipes = () => {
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [cart, setCart] = useState([]);
  const [frequencies, setFrequencies] = useState({});
  const [itemPrices, setItemPrices] = useState({});
  const [itemQuantities, setItemQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showAddToCartMsg, setShowAddToCartMsg] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/food-options');
        const data = await response.json();
        setFoodOptions(data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoodData();
  }, []);

  const calculatePrice = (basePrice, frequency) => {
    switch (frequency) {
      case 'weekly': return basePrice * 7;
      case 'monthly': return basePrice * 30;
      default: return basePrice;
    }
  };

  const handleFrequencyChange = (id, frequency, basePrice) => {
    setFrequencies((prev) => ({ ...prev, [id]: frequency }));
    setItemPrices((prev) => ({ ...prev, [id]: calculatePrice(basePrice, frequency) }));
  };

  const addToCart = (item) => {
    if (frequencies[item._id]) {
      const quantity = itemQuantities[item._id] || 1;
      const updatedCart = [
        ...cart,
        {
          ...item,
          frequency: frequencies[item._id],
          price: itemPrices[item._id] * quantity,
          quantity,
        },
      ];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setShowAddToCartMsg(true);
      setTimeout(() => setShowAddToCartMsg(false), 2000);
    } else {
      alert('Please select frequency for this item.');
    }
  };

  const getTotal = () => cart.reduce((total, item) => total + item.price, 0);

  const filterItems = (category) => {
    return foodOptions
      .filter((item) => (selectedType ? item.type === selectedType : true))
      .filter((item) => item.category === category);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const incrementQuantity = (id) => {
    setItemQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            price: itemPrices[id] * (item.quantity + 1),
          }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (id) => {
    setItemQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: Math.max(item.quantity - 1, 1),
            price: itemPrices[id] * Math.max(item.quantity - 1, 1),
          }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    setItemQuantities({});
    localStorage.removeItem('cart');
  };

  const handleClick = () => {
    if (getTotal() === 0) {
      alert('The cart is empty');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/Payment');
    }
  };

  return (
    <div className="explore-recipes">
      <div className="cart-icon" onClick={toggleCart}>🛒</div>

      {showCart && (
        <div className="cart-popup">
          <h3>
            Cart Summary
            <img
              className="closeButton"
              onClick={toggleCart}
              src="https://openclipart.org/image/800px/26556"
              alt="close"
            />
          </h3>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name} ({item.frequency}) x {item.quantity}</span>
              <div className="quantity-control-cart">
                <button onClick={() => decrementQuantity(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item._id)}>+</button>
              </div>
              <span>₹{item.price}</span>
            </div>
          ))}
          <hr />
          <p>Total: ₹{getTotal()}</p>
          <button className="pay-btn" onClick={handleClick}>Proceed to Payment</button>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}

      {showAddToCartMsg && (
        <div className="add-to-cart-msg show-msg">Item added to cart!</div>
      )}

      {!selectedCategory ? (
        <div className="category-selection">
          <div className="recipe-card" onClick={() => setSelectedCategory('veg')}>
            <img src="https://openclipart.org/image/800px/304248" alt="Veg" />
            <h4>Veg</h4>
          </div>
          <div className="recipe-card" onClick={() => setSelectedCategory('non-veg')}>
            <img src="https://openclipart.org/image/800px/304247" alt="Non-Veg" />
            <h4>Non-Veg</h4>
          </div>
          <div className="recipe-card" onClick={() => setSelectedCategory('vegan')}>
            <img src="https://openclipart.org/image/800px/194524" alt="Vegan" />
            <h4>Vegan</h4>
          </div>
          <div className="recipe-card" onClick={() => setSelectedCategory('drinks')}>
            <img src="https://openclipart.org/image/800px/311897" alt="Drinks" />
            <h4>Drinks</h4>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedCategory(null)}>Back</button>
          <div className="type-filter">
            <button onClick={() => setSelectedType(null)}>All</button>
            <button onClick={() => setSelectedType('indian')}>Indian</button>
            <button onClick={() => setSelectedType('chinese')}>Chinese</button>
            <button onClick={() => setSelectedType('gym')}>Gym Friendly</button>
          </div>
          <div className="recipe-types">
            {filterItems(selectedCategory).map((item) => (
              <div className="recipe-card" key={item._id}>
                <img src={item.img} alt={item.name} />
                <div className="recipe-details">
                  <h4>{item.name}</h4>
                  <p>₹{itemPrices[item._id] || item.price}</p>
                  <div className="frequency-select">
                    <label>Select Frequency:</label>
                    <select
                      onChange={(e) =>
                        handleFrequencyChange(item._id, e.target.value.toLowerCase(), item.price)
                      }
                    >
                      <option value="none">Select</option>
                      <option value="once">Once</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreRecipes;
