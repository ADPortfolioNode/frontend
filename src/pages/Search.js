import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      // Simulate a search operation
      const simulatedResults = [`Result for "${query}"`, `Another result for "${query}"`];
      setTimeout(() => {
        setResults(simulatedResults);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error during search:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Search</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? <LoadingSpinner /> : <Results results={results} />}
    </div>
  );
};

export default Search;
