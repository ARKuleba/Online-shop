import React, { useEffect, useState } from 'react';
import '../css_modules/Filters.css';

function Filters({ categoryFilter, colorFilter, originalProducts, onUpdate, filteredProducts }) {
  const [activeColorCheckboxes, setActiveColorCheckboxes] = useState([]);
  const [activeCategoryCheckboxes, setActiveCategoryCheckboxes] = useState([]);
  const [lowestPrice, setLowestPrice] = useState('');
  const [highestPrice, setHighestPrice] = useState('');

  const handleColorCheckboxChange = (event, color) => {
    if (event.target.checked) {
      setActiveColorCheckboxes((prevActiveCheckboxes) => [...prevActiveCheckboxes, color]);
    } else {
      setActiveColorCheckboxes((prevActiveCheckboxes) =>
        prevActiveCheckboxes.filter((checkbox) => checkbox !== color)
      );
    }
  };

  const handleCategoryCheckboxChange = (event, category) => {
    if (event.target.checked) {
      setActiveCategoryCheckboxes((prevActiveCheckboxes) => [...prevActiveCheckboxes, category]);
    } else {
      setActiveCategoryCheckboxes((prevActiveCheckboxes) =>
        prevActiveCheckboxes.filter((checkbox) => checkbox !== category)
      );
    }
  };

  const handleChangeLowestPrice = (newPrice) => {
    if (newPrice === '') {
      setLowestPrice('');
    } else {
      setLowestPrice(parseFloat(newPrice));
    }
  };
  
  const handleChangeHighestPrice = (newPrice) => {
    if (newPrice === '') {
      setHighestPrice('');
    } else {
      setHighestPrice(parseFloat(newPrice));
    }
  };

  useEffect(() => {
    const filtered = filteredProducts.filter((product) => {
      const colorMatch =
        activeColorCheckboxes.length === 0 || activeColorCheckboxes.includes(product.color);
      const categoryMatch =
        activeCategoryCheckboxes.length === 0 || activeCategoryCheckboxes.includes(product.category);
        const priceMatch =
        (lowestPrice === '' && highestPrice === '') ||
        (lowestPrice !== '' && highestPrice !== '' && product.price >= lowestPrice && product.price <= highestPrice) ||
        (lowestPrice !== '' && highestPrice === '' && product.price >= lowestPrice) ||
        (lowestPrice === '' && highestPrice !== '' && product.price <= highestPrice);
      return colorMatch && categoryMatch && priceMatch;
    });
  
    const updatedProducts =
      lowestPrice === '' &&
      highestPrice === '' &&
      activeCategoryCheckboxes.length === 0 &&
      activeColorCheckboxes.length === 0
        ? filteredProducts
        : filtered;
    onUpdate(updatedProducts);
  }, [activeColorCheckboxes, activeCategoryCheckboxes, lowestPrice, highestPrice, originalProducts, filteredProducts]);

  return (
    <div className='Filters'>
      <div className='colorBox'>По цвету</div>
      {colorFilter.map((color) => (
        <div className='filterBox' key={color}>
          <input
            type="checkbox"
            className='checking'
            checked={activeColorCheckboxes.includes(color)}
            onChange={(event) => handleColorCheckboxChange(event, color)}
          />
          <p>{color}</p>
        </div>
      ))}
      <div className='categoryBox'>По категории</div>
      {categoryFilter.map((category) => (
        <div className='filterBox' key={category}>
          <input
            type="checkbox"
            className='checking'
            checked={activeCategoryCheckboxes.includes(category)}
            onChange={(event) => handleCategoryCheckboxChange(event, category)}
          />
          <p>{category}</p>
        </div>
      ))}
      <div className='priceBox'>По цене</div>
      <div className='box'>
        <input
          value={lowestPrice}
          onChange={(event) => handleChangeLowestPrice(event.target.value)}
          className='price'
          placeholder='ОТ'
        />
        <p className='line'>-</p>
        <input
          value={highestPrice}
          onChange={(event) => handleChangeHighestPrice(event.target.value)}
          className='price'
          placeholder='ДО'
        />
      </div>
    </div>
  );
}

export default Filters;