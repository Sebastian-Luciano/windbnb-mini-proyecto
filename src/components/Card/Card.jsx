import React from 'react';

export default function Card({ stay }) {
  const { photo, superHost, type, title, rating, beds } = stay;

  return (
    <div className='card'>
      <img src={photo} className="card-img" alt={title}  />
      <div className="card-body">
        <div className="card-info">
          {superHost && <span className="superhost">SUPER HOST</span>}
          <span className="type">
            {type}
            {beds && ` · ${beds} beds`}
          </span>
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{rating}</span>
          </div>
        </div>
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );

}