import React from 'react'
import '../css_modules/Product.css';
import photo from '../img/photo.jpg';

function Product(props) {
  return (
    <div className='Product'>
        <img className='photo' src={props.img} />
      <div className="text">
        <p className='name'><strong>{props.name}</strong></p>
        <p className='description'>{props.description}</p>
        <div className='color'>
          <p>Цвет</p>
          <p className='propsText'>{props.color}</p>
        </div>
        <div className='category'>
          <p>Категория</p>
          <p className='propsText'>{props.category}</p>
        </div>
        <div className='priceProduct'>
          <p>Цена</p>
          <p className='propsText'>{props.price + " BYN"}</p>
        </div>
        <div className='rating'>
          <p>Рейтинг</p>
          <p className='propsText'>{props.rating}</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Product)