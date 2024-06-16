import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import staysData from '../Data/stays.json';

export default function Modal({ isOpen, onClose, onSubmit, setLocation, setGuests }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Helsinki, Finland');
  const [showLocation, setShowLocation] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const [locationActive, setLocationActive] = useState(false);
  const [guestsActive, setGuestsActive] = useState(false);

  const handleLocationClick = () => {
    setLocationActive(true);
    setGuestsActive(false);
  };

  const handleGuestsClick = () => {
    setGuestsActive(true);
    setLocationActive(false);
  };

  useEffect(() => {
    const uniqueCities = [...new Set(staysData.map((stay) => stay.city))];
    setCities(uniqueCities);
  }, []);

  const handleLocationChange = (city) => {
    setSelectedCity(city + ', Finland');
    setLocation(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalGuests = adults + children;
    setGuests(`${totalGuests}`);
    onSubmit(selectedCity, `${totalGuests}`);
    onClose();
  };

  const toggleLocation = () => {
    setShowLocation(!showLocation);
    setShowGuests(false);
  };

  const toggleGuests = () => {
    setShowGuests(!showGuests);
    setShowLocation(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={['fas', 'times']} />
        </button>
        <div className='data-form'>
          <form onSubmit={handleSubmit}>
            <div className="botones-modal">
              <div className={`btn-location-input ${locationActive ? 'active' : ''}`} onClick={handleLocationClick}>
                <div className="btn-location-input" onClick={toggleLocation}>
                  <label>Location</label>
                  <span>{selectedCity || 'Whole, Finland'}</span>
                </div>
              </div>
              <div className={`btn-guests-input ${guestsActive ? 'active' : ''}`} onClick={handleGuestsClick}>
                <div className="btn-guests-input" onClick={toggleGuests}>
                  <label>Guests</label>
                  <div className="guests-display">{adults + children === 0 ? 'Add guests' : `${adults + children} guests`}</div>
                </div>
              </div>
              <div className='modal-btn-search'>
                <button type="submit" className="btn-search">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </button>
              </div>
            </div>
            <div className="search-inputs">
              <div className="location-input">
                {showLocation && (
                  <div className="location-select">
                    <ul>
                      {cities.map((city, index) => (
                        <li key={index} onClick={() => handleLocationChange(city)}>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                          {city}, Finland
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="guests-input">
                {showGuests && (
                  <div>
                    <div className='adult-counter'>
                      <span className='adult-age-range'>Adult</span>
                      <span className="age-range">Age 13 or above</span>
                      <span className="counter">
                        <button type="button" onClick={() => setAdults(Math.max(adults - 1, 0))}>
                          -
                        </button>
                        <span>{adults}</span>
                        <button type="button" onClick={() => setAdults(adults + 1)}>
                          +
                        </button>
                      </span>
                    </div>
                    <div className='child-counter'>
                      <span className='child-age-range'>Children</span>
                      <span className="age-range">Age 2-12</span>
                      <span className="counter">
                        <button type="button" onClick={() => setChildren(Math.max(children - 1, 0))}>
                          -
                        </button>
                        <span>{children}</span>
                        <button type="button" onClick={() => setChildren(children + 1)}>
                          +
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}