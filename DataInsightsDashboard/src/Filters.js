import React from 'react';

function Filters({ filterValues, setFilterValues, data }) {
    const uniqueYears = Array.from(new Set(data.map(item => item.year))).filter(Boolean);
    const uniqueTopics = Array.from(new Set(data.map(item => item.topic)));
    const uniqueSectors = Array.from(new Set(data.map(item => (item.sector ? item.sector.toLowerCase() : null))));
    const uniqueRegions = Array.from(new Set(data.map(item => (item.region ? item.region.toLowerCase() : null))));
    const uniquePestle = Array.from(new Set(data.map(item => (item.pestle ?item.pestle.toLowerCase() : null))));
    const uniqueSources = Array.from(new Set(data.map(item => (item.source ? item.source.toLowerCase() : null))));
    const uniqueCountries = Array.from(new Set(data.map(item => item.country)));
    const uniqueCities = Array.from(new Set(data.map(item => item.city))); // Define uniqueCities

  const handleFilterChange = (filterType, value) => {
    setFilterValues(prevValues => ({
      ...prevValues,
      [filterType]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
  };


  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <label>End Year:</label>
        <select
          onChange={e => handleFilterChange('endYear', e.target.value)}
          value={filterValues.endYear}
        >
          <option value="">All</option>
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
  
        <label>Topics:</label>
        <select
          onChange={e => handleFilterChange('topics', e.target.value)}
          value={filterValues.topics}
        >
          <option value="">All</option>
          {uniqueTopics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
  
        <label>Sector:</label>
        <select
          onChange={e => handleFilterChange('sector', e.target.value)}
          value={filterValues.sector}
        >
          <option value="">All</option>
          {uniqueSectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
  
        <label>Region:</label>
        <select
          onChange={e => handleFilterChange('region', e.target.value)}
          value={filterValues.region}
        >
          <option value="">All</option>
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
  
        <label>PESTLE:</label>
        <select
          onChange={e => handleFilterChange('pestle', e.target.value)}
          value={filterValues.pestle}
        >
          <option value="">All</option>
          {uniquePestle.map(pestle => (
            <option key={pestle} value={pestle}>{pestle}</option>
          ))}
        </select>
  
        <label>Source:</label>
        <select
          onChange={e => handleFilterChange('source', e.target.value)}
          value={filterValues.source}
        >
          <option value="">All</option>
          {uniqueSources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
  
        <label>Country:</label>
        <select
          onChange={e => handleFilterChange('country', e.target.value)}
          value={filterValues.country}
        >
          <option value="">All</option>
          {uniqueCountries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
  
        <label>City:</label>
        <select
          onChange={e => handleFilterChange('city', e.target.value)}
          value={filterValues.city}
        >
          <option value="">All</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
  
        <button type="submit">Reset Filters</button>
      </form>
    </div>
  );
  
}

export default Filters;
