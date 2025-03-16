import React, { useState, useEffect, useRef } from 'react';
import searchIcon from '../img/search.svg';
import '../css_modules/SortAndSearch.css';

const SORT = {
  cheap: {
    name: "Сначала дешёвые",
    fn: (a, b) => parseFloat(a.price) - parseFloat(b.price)
  },
  expensive: {
    name: "Сначала дорогие",
    fn: (a, b) => parseFloat(b.price) - parseFloat(a.price)
  },
  popular: {
    default: true,
    name: "Сначала популярные",
    fn: (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  }
};

function SortAndSearch({ products, onUpdate, originalProducts, onFilteredUpdate , onSortChange }) {
  const prevProductsRef = useRef(products);
  const [buttonStyle, setButtonStyle] = useState({
    cheap: {},
    expensive: {},
    popular: { background: "rgb(27, 27, 27)", color: "white" }
  });

  const [sortType, setSortType] = useState(() => Object.keys(SORT).find((key) => SORT[key].default));
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeStyle = (newSortType) => {
    setSortType(newSortType);
    setButtonStyle({
      cheap: newSortType === 'cheap' ? { background: "rgb(27, 27, 27)", color: "white" } : {},
      expensive: newSortType === 'expensive' ? { background: "rgb(27, 27, 27)", color: "white" } : {},
      popular: newSortType === 'popular' ? { background: "rgb(27, 27, 27)", color: "white" } : {}
    });
  };

  const handleSearchProducts = (searchText) => {
    if (!searchText || searchText.trim() === '') {
      return originalProducts; 
    } else {
      return originalProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    const debounce = setTimeout(() => {
      const filteredProducts = handleSearchProducts(searchText);
      onUpdate(filteredProducts);
      onFilteredUpdate(filteredProducts);
    }, 400);
    return () => clearTimeout(debounce);
  };

  useEffect(() => {
    onSortChange(() => SORT[sortType].fn )
  }, [onSortChange, sortType]);

  return (
    <div className='sortAndSearch'>
      {Object.entries(SORT).map(([key, value]) => (
        <button key={key} style={buttonStyle[key]} onClick={() => handleChangeStyle(key)}>
          {value.name}
        </button>
      ))}
      <div className='search'>
        <img className="icon" src={searchIcon} alt='' />
        <input value={searchTerm} onChange={handleInputChange} type="text" placeholder='Поиск' />
      </div>
    </div>
  );
}

export default SortAndSearch;