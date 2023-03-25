import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://disneyapi.dev/characters')
      .then(response => {
        setCharacters(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sortByName = () => {
    const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    setCharacters(sortedCharacters);
  };

  const sortByID = () => {
    const sortedCharacters = [...characters].sort((a, b) => a.id - b.id);
    setCharacters(sortedCharacters);
  };

  const handleSearch = event => {
    const query = event.target.value.toLowerCase();
    const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(query));
    setCharacters(filteredCharacters);
  };

  return (
    <div>
      <input type="text" placeholder="Search for characters" onChange={handleSearch} />
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByID}>Sort by ID</button>
      <div className="characters">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>{character.url}</p>
    </div>
  );
}

export default App;
