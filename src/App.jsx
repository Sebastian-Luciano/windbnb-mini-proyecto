import React, { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import Nav from './components/Nav/Nav';
import staysData from './components/Data/stays.json';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
export default function App() {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);

  useEffect(() => {
    setStays(staysData);
    setFilteredStays(staysData);
  }, []);

  const handleSearch = (location, guests) => {
    const guestsNum = parseInt(guests, 10) || 0; // Convertimos el número de huéspedes a entero
    const filtered = stays.filter(
      (stay) =>
        stay.city.toLowerCase() === location.toLowerCase() &&
        stay.maxGuests >= guestsNum
    );
    setFilteredStays(filtered);
  };
  
  return (
    <div className="App">
      <Nav onSearch={handleSearch} />
      <main className="container mt-5">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Stays in Finland</h1>
          <span>{filteredStays.length}+ stays</span>
        </header>
        <div className="stays-grid">
          {filteredStays.map((stay, index) => (
            <Card key={stay.title + index} stay={stay} />
          ))}
        </div>
      </main>
    </div>
  );
}