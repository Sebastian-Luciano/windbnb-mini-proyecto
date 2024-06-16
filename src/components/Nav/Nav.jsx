import { useState } from 'react';
import Modal from './Modal';

export default function Nav({ onSearch }) {
  const [location, setLocation] = useState('Helsinki, Finland');
  const [guests, setGuests] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    onSearch(location, guests);
    setShowModal(false);
  };

  return (
    <nav className="navbar py-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/logo.svg" alt="windbnb" />
        </a>
        <div className="search-bar" onClick={() => setShowModal(true)} role="button" tabIndex={0}
          onKeyDown={() => setShowModal(true)}>
          <input className='add-location' type="text" placeholder="Add location" value={location + ', Finland'} readOnly />
          <span className="divider"></span>
          <a><input className='add-guests' type="text" placeholder="Add guests" value={guests} readOnly /></a>
          <span className="divider"></span>
          <button className="btn-search" type="button">
            <i className="fas fa-search search-icon"></i>
          </button>
        </div>
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            setLocation={setLocation}
            setGuests={setGuests}
          />
        )}
      </div>
    </nav>
  );
}