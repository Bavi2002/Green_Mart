import React, { useState, /*useEffect*/ } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import dummyData from '../dummyData'; // Assuming dummyData is imported from another file

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Handle search for dummy data
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== '') {
      const filteredResults = dummyData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch} // For dummy data
        placeholder="Search products..."
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((item) => (
            <li className='list' key={item.id}>
              <Link to={`/product/${item._id}`} className='list-product'>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
