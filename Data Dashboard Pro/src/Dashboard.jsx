// Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import md5 from "js-md5";
import "./App.css";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [minComics, setMinComics] = useState(0);
  const [minSeries, setMinSeries] = useState(0);
  const [selectedChart, setSelectedChart] = useState("comics");

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

  const chartData = filteredCharacters.map((character) => ({
    name: character.name,
    comics: character.comics.available,
    series: character.series.available,
  }));
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #999",
            borderRadius: "5px",
          }}
        >
          <p className="label">{`Character: ${label}`}</p>
          <p className="intro">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const fetchCharacters = async (searchQuery) => {
    const timeStamp = new Date().getTime();
    const publicKey = "756a3b8303dc5198d1a65ba2d29f8425";
    const privateKey = "18d69adbfad63e8efdfc688e3707a6b32cdd92e8";
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

      <div className="content-container">
        <div className="list-container">
          {/* Character list */}
          <ul className="character-list">
            {filteredCharacters.map((character) => (
              <li key={character.id} className="character-item">
                <Link to={`/character/${character.id}`}>{character.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="controls-container">
          <label>Select chart type: </label>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
          >
            <option value="comics">Comics</option>
            <option value="series">Series</option>
          </select>
        </div>

        <div
          className="chart-container"
          style={{ width: "500%", height: "500px" }}
        >
          <ResponsiveContainer width="250%" height={600}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={selectedChart} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
