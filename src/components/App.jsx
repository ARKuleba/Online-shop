import React, { useState, useEffect, useCallback } from 'react';
import '../css_modules/App.css';
import Filters from './Filters';
import Product from './Product';
import SortAndSearch from './SortAndSearch';

function App() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categoryFilter = ['Одежда', 'Аксессуары', 'Обувь'];
  const colorFilter = ['Чёрный', 'Красный', 'Белый', 'Голубой', 'Бежевый', 'Коричневый'];

  const handleGenerateRandomProduct = () => {
    const names = ['Туфли', 'Кеды', 'Рубашка', 'Брюки', 'Сумка', 'Худи'];
    const img = ['https://avatars.mds.yandex.net/i?id=1ac88799457c5bb972e0dc5a455c8c38ca8c13c8-10158740-images-thumbs&n=13', 'https://avatars.mds.yandex.net/i?id=b1440ce0cc1d36035ff7204e7600cd50f0c1cd1d-10636921-images-thumbs&n=13', 'https://fashionhot.club/uploads/posts/2022-12/1670402465_8-fashionhot-club-p-rubashka-kartinka-dlya-detei-8.jpg', 'https://avatars.mds.yandex.net/i?id=601aa28cc7c48f7e77fbd2a79fca72ae14a44e5f-10927571-images-thumbs&n=13', 'https://user-images.githubusercontent.com/25410880/54082484-5b5b1180-42cb-11e9-85d3-2aa21cc88726.png', 'https://avatars.mds.yandex.net/i?id=d9a0383609892c5aeb91637eaf26a7abccaae638-10150478-images-thumbs&ref=rim&n=33&w=250&h=250'];
    const description = ['Выполнены из кожи дракона', 'Непромокаемый материал', 'Красивый дизайн', 'Стильно модно молодёжно', 'Нраивтся всем девушкам', 'Тренд 2023 года'];
    const color = ['Чёрный', 'Красный', 'Белый', 'Голубой', 'Бежевый', 'Коричневый'];
    const category = ['Обувь', 'Обувь', 'Одежда', 'Одежда', 'Аксессуары', 'Одежда'];
  
    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    const selectedImg = img[randomIndex];
    const selectedDescription = description[Math.floor(Math.random() * description.length)];
    const selectedColor = color[Math.floor(Math.random() * color.length)];
    const selectedCategory = category[randomIndex];
    const price = (Math.random() * 900 + 100).toFixed(0);
    const rating = (Math.random() * 5 + 5).toFixed(1);
  
    const product = {
      name: name,
      img: selectedImg,
      description: selectedDescription,
      color: selectedColor,
      category: selectedCategory,
      price: price,
      rating: rating
    };
  
    return product;
  }

  const handleFillProducts = useCallback(() => {
    let newProducts = [];
    const productsLength = 6;

    for (let i = 0; i < productsLength; i++) {
      let product = handleGenerateRandomProduct();
      newProducts.push(product);
    }
    setProducts(newProducts);
    setOriginalProducts(newProducts); 
    setFilteredProducts(newProducts);
  }, []);

  useEffect(() => {
    handleFillProducts();
  }, [handleFillProducts]);

  const [sortFn, setSortFn] = useState(() => () => 0);

  const sortProducts = products.sort(sortFn)

  return (
    <div className="App">
      <SortAndSearch
        products={products}
        onSortChange={setSortFn}
        originalProducts={originalProducts}
        onFilteredUpdate={setFilteredProducts}
        onUpdate={setProducts}
      />
      <div className='container'>
        <Filters 
          originalProducts={originalProducts}
          categoryFilter={categoryFilter}
          colorFilter={colorFilter}
          onUpdate={setProducts}
          filteredProducts={filteredProducts}
        />
        <div className='list'>
          {products.length === 0 ? (
            <p className='error'>По вашему запросу ничего не найдено...</p>
          ) : (
            products.map((product) => (
              <Product
                key={product.price}
                name={product.name}
                img={product.img}
                description={product.description}
                color={product.color}
                category={product.category}
                price={product.price}
                rating={product.rating}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;