import React, { useState, useEffect } from 'react';
import DashboardCharts from './DashboardCharts';
import Filters from './Filters';

function Dashboard({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [filterValues, setFilterValues] = useState({
    endYear: '',
    topics: [],
    sector: '',
    region: '',
    pestle: '',
    source: '',
  });

  const applyFilters = () => {
    let filtered = [...data];

    // Filter by end year
    if (filterValues.endYear) {
      filtered = filtered.filter(
        item => !item.end_year || item.end_year <= filterValues.endYear
      );
    }

    // Filter by topics
    if (filterValues.topics.length > 0) {
      filtered = filtered.filter(item =>
        filterValues.topics.includes(item.topic)
      );
    }

    // Filter by sector
    if (filterValues.sector) {
      filtered = filtered.filter(
        item => item.sector.toLowerCase() === filterValues.sector.toLowerCase()
      );
    }

    // Filter by region
    if (filterValues.region) {
      filtered = filtered.filter(
        item => item.region.toLowerCase() === filterValues.region.toLowerCase()
      );
    }

    // Filter by PESTLE
    if (filterValues.pestle) {
      filtered = filtered.filter(
        item => item.pestle.toLowerCase() === filterValues.pestle.toLowerCase()
      );
    }

    // Filter by source
    if (filterValues.source) {
      filtered = filtered.filter(
        item => item.source.toLowerCase() === filterValues.source.toLowerCase()
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterValues, data]);

  return (
    <div>
      <Filters
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        data={data}
      />
      <DashboardCharts data={filteredData} />
    </div>
  );
}

export default Dashboard;
