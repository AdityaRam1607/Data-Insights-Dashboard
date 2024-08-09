import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
//import Filters from './Filters'; // Assuming your Filters component is imported from Filter.js

function DashboardCharts({ data }) {
    const scatterChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const donutChartRef = useRef(null);
    //const choroplethMapRef = useRef(null);
    const stackedAreaChartRef = useRef(null);
  
    useEffect(() => {
      let scatterChartInstance, barChartInstance, lineChartInstance, donutChartInstance, stackInstance;
  
      if (data.length > 0) {
        scatterChartInstance = drawScatterChart();
        barChartInstance = drawBarChart();
        lineChartInstance = drawLineChart();
        donutChartInstance = drawDonutChart();
        stackInstance = drawStackedAreaChart();
  
        return () => {
          // Clean up chart instances when the component unmounts
          scatterChartInstance.destroy();
          barChartInstance.destroy();
          lineChartInstance.destroy();
          donutChartInstance.destroy();
          stackInstance.destroy();
        };
      }
    }, [data]);


    const drawStackedAreaChart = () => {
        const ctx = stackedAreaChartRef.current.getContext('2d');
    
        const regions = [...new Set(data.map(item => item.region))];
        const years = [...new Set(data.map(item => (item.added ? item.added.slice(-4) : ' ')))];
    
        const intensityByRegion = {};
    
        regions.forEach(region => {
          intensityByRegion[region] = years.map(year =>
            data
              .filter(item => item.added && item.added.includes(year) && item.region === region)
              .reduce((acc, item) => acc + item.intensity, 0)
          );
        });
    
        return new Chart(ctx, {
          type: 'line',
          data: {
            labels: years,
            datasets: regions.map((region, index) => ({
              label: region,
              data: intensityByRegion[region],
              backgroundColor: `rgba(${index * 50}, ${index * 100}, ${index * 150}, 0.6)`,
              fill: true,
            })),
          },
          options: {
            scales: {
              y: {
                stacked: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Intensity',
                  color: 'black',
                  font: {
                    weight: 'bold',
                    size: 14
                  }
                }
              },
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Since the particular is unavailable Including all the Years at a particular time',
                  color: 'black',
                  font: {
                    weight: 'bold',
                    size: 14
                  }
                }
              },
            },
          },
        });
      };
    



    const drawDonutChart = () => {
        const ctx = donutChartRef.current.getContext('2d');
      
        if (!data || data.length === 0 || !Array.isArray(data)) {
          return;
        }
      
        const relevanceLevels = [...new Set(data.map(item => item.relevance || ''))];
      
        if (relevanceLevels.length === 0) {
          return;
        }
      
        const topics = [...new Set(data.map(item => item.topic || ''))];
      
        const relevanceProportionByTopic = {};
      
        topics.forEach(topic => {
          const relevanceCounts = {};
          relevanceLevels.forEach(level => {
            relevanceCounts[level] = data.filter(
              item => item.topic === topic && item.relevance === level
            ).length;
          });
          relevanceProportionByTopic[topic] = relevanceCounts;
        });
      
        const selectedTopic = topics[0]; // Selecting the first topic for the donut chart
      
        const selectedData = relevanceProportionByTopic[selectedTopic];
      
        if (!selectedData) {
          return;
        }
      
        const labels = Object.keys(selectedData).map(level => `${selectedTopic} - Level ${level}`); // Display topic and level
      
        // Generate unique colors using HSL color model
        const colors = [];
        const saturation = 70; // Adjust saturation for color variation
        const lightness = 50; // Adjust lightness for color variation
      
        for (let i = 0; i < relevanceLevels.length; i++) {
          const hue = (360 / relevanceLevels.length) * i;
          const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;
          colors.push(color);
        }
      
        return new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Relevance Proportion',
                data: Object.values(selectedData),
                backgroundColor: colors,
              },
            ],
          },
          options: {
            aspectRatio: 1,
          },
        });
      };
      
      
      
      



  const drawScatterChart = () => {
    const ctx = scatterChartRef.current.getContext('2d');
    const intensityValues = data.map(item => item.intensity);
    const likelihoodValues = data.map(item => item.likelihood);
    const relevanceValues = data.map(item => item.relevance);

    return new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Intensity vs. Likelihood according to relevance',
            data: intensityValues.map((_, i) => ({
              x: intensityValues[i],
              y: likelihoodValues[i],
              r: relevanceValues[i] * 5, // Use relevance for size of points
            })),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Intensity',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Likelihood',
            },
          },
        },
      },
    });
  };

  const drawBarChart = () => {
    const ctx = barChartRef.current.getContext('2d');
    const topics = [...new Set(data.map(item => item.topic))];
    const sectors = [...new Set(data.map(item => item.sector))];

    const topicDistribution = {};

    topics.forEach(topic => {
      topicDistribution[topic] = sectors.map(sector =>
        data.filter(item => item.topic === topic && item.sector === sector).length
      );
    });

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sectors,
        datasets: topics.map((topic, index) => ({
          label: topic,
          data: topicDistribution[topic],
          backgroundColor: `rgba(${index * 50}, ${index * 100}, ${index * 150}, 0.6)`,
        })),
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const drawLineChart = () => {
    const ctx = lineChartRef.current.getContext('2d');
    const years = [...new Set(data.map(item => (item.added && typeof item.added==='string' ? item.added.slice(-4) : ' ')))];
    const intensityByYear = {};
    const likelihoodByYear = {};

    years.forEach(year => {
      intensityByYear[year] = data
        .filter(item => item.added && item.added.includes(year))
        .map(item => item.intensity)
        .reduce((acc, cur) => acc + cur, 0);
      likelihoodByYear[year] = data
        .filter(item => item.added && item.added.includes(year))
        .map(item => item.likelihood)
        .reduce((acc, cur) => acc + cur, 0);
    });

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Intensity',
            data: Object.values(intensityByYear),
            borderColor: 'rgba(255, 99, 132, 0.6)',
            fill: false,
          },
          {
            label: 'Likelihood',
            data: Object.values(likelihoodByYear),
            borderColor: 'rgba(54, 162, 235, 0.6)',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };




  



  
 
  

  return (
    <div>
        
      <div>
        <h2>Relevance Proportion Chart</h2>
        <p>
          Level of the Topic indicates its relevance number.<br />
          Proportion indicates the number of occurrences of relevance.
        </p>
      </div>
      <div>
        <canvas ref={donutChartRef}></canvas>
      </div>
      <div>
        <h2>Stacked Area Chart</h2>
        <p>
          The Intensity of the Countries at a particular Time of year.<br />
          For some Intensity values the country is not provided it may show Blank name with Intensity Values.
        </p>
      </div>
      <div>
        <canvas ref={stackedAreaChartRef}></canvas>
      </div>
      <div>
        <canvas ref={scatterChartRef}></canvas>
      </div>
      
      <div>
        <canvas ref={barChartRef}></canvas>
      </div>
      <div>
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
  

}

export default DashboardCharts;
