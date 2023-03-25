import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const App = () => {
const [characters, setCharacters] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [sortType, setSortType] = useState('');

useEffect(() => {
axios.get('https://disneyapi.dev/characters')
.then(response => {
setCharacters(response.data);
})
.catch(error => {
console.log(error);
});
}, []);

const handleSearchChange = event => {
setSearchTerm(event.target.value);
};

const handleSortChange = event => {
setSortType(event.target.value);
};

const filteredCharacters = characters.filter(character => {
return character.name.toLowerCase().includes(searchTerm.toLowerCase()) || character.movie.toLowerCase().includes(searchTerm.toLowerCase());
});

const sortedCharacters = filteredCharacters.sort((a, b) => {
if (sortType === 'name') {
return a.name.localeCompare(b.name);
} else if (sortType === 'id') {
return a.id - b.id;
}
});

return (
<Router>
<div className="container">
<div className="row">
<div className="col-md-6 offset-md-3">
<h1 className="text-center">Disney Characters</h1>
<div className="form-group">
<label htmlFor="search">Search:</label>
<input
             type="text"
             id="search"
             className="form-control"
             placeholder="Search by name or movie..."
             value={searchTerm}
             onChange={handleSearchChange}
           />
</div>
<div className="form-group">
<label htmlFor="sort">Sort by:</label>
<select
             id="sort"
             className="form-control"
             value={sortType}
             onChange={handleSortChange}
           >
<option value="">Choose...</option>
<option value="name">Name</option>
<option value="id">ID</option>
</select>
</div>
<Switch>
<Route exact path="/">
{sortedCharacters.map(character => (
<Card key={character.id} className="mb-3">
<CardImg top src={character.image} alt={character.name} />
<CardBody>
<CardTitle tag="h5">{character.name}</CardTitle>
<CardSubtitle tag="h6" className="mb-2 text-muted">{character.movie}</CardSubtitle>
<p>{character.description}</p>
</CardBody>
</Route>
</Switch>

</div>
</div>
</div>
</Router>
);
};
export default App;
