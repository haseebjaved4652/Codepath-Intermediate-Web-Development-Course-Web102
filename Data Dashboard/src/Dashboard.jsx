// Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import md5 from "js-md5";
import "./App.css";

const Dashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [minComics, setMinComics] = useState(0);
  const [minSeries, setMinSeries] = useState(0);

  useEffect(() => {
    fetchCharacters(searchInput);
  }, [searchInput]);

  useEffect(() => {
    const filtered = characters.filter(
      (character) =>
        character.comics.available >= minComics &&
        character.series.available >= minSeries
    );
    setFilteredCharacters(filtered);
  }, [characters, minComics, minSeries]);

  const fetchCharacters = async (searchQuery) => {
    const timeStamp = new Date().getTime();
    const publicKey = "756a3b8303dc5198d1a65ba2d29f8425"; // Replace with your actual public API key
    const privateKey = "18d69adbfad63e8efdfc688e3707a6b32cdd92e8"; // Replace with your actual private API key
    const hash = md5(timeStamp + privateKey + publicKey);

    let params = {
      ts: timeStamp,
      apikey: publicKey,
      hash: hash,
      limit: 100,
    };

    if (searchQuery) {
      params["nameStartsWith"] = searchQuery;
    }

    try {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters`,
        { params }
      );
      setCharacters(response.data.data.results);
    } catch (error) {
      console.error("Error fetching data from Marvel API:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const totalCharacters = filteredCharacters.length;
  const averageComics = totalCharacters
    ? filteredCharacters.reduce((acc, char) => acc + char.comics.available, 0) /
      totalCharacters
    : 0;
  const medianSeries = calculateMedian(
    filteredCharacters.map((char) => char.series.available)
  );

  function calculateMedian(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return (
    <div className="dashboard-container">
      <div className="search-container">
        <label htmlFor="searchInput" className="search-label">
          Search for a character:
        </label>
        <input
          id="searchInput"
          className="search-input"
          type="text"
          placeholder="e.g., Spider-Man"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="filter-container">
        <div className="filter">
          <label htmlFor="minComics" className="filter-label">
            Minimum number of comics:
          </label>
          <input
            id="minComics"
            className="filter-input"
            type="number"
            placeholder="0"
            value={minComics}
            onChange={(e) => setMinComics(Number(e.target.value))}
          />
        </div>

        <div className="filter">
          <label htmlFor="minSeries" className="filter-label">
            Minimum number of series:
          </label>
          <input
            id="minSeries"
            className="filter-input"
            type="number"
            placeholder="0"
            value={minSeries}
            onChange={(e) => setMinSeries(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="statistics-container">
        <p>Total Characters: {totalCharacters}</p>
        <p>Average Comics: {averageComics.toFixed(2)}</p>
        <p>Median Series: {medianSeries}</p>
      </div>

      <ul className="character-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <li key={character.id} className="character-item">
              <h3>{character.name}</h3>
              <p>{character.description || "Description not available."}</p>
            </li>
          ))
        ) : (
          <p>No characters found.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
