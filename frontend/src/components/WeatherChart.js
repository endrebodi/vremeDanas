import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

export default function WeatherChart(props) {
  const [chartData, setChartData] = useState([]);

  const transformData = (data) => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Minimalna temperatura',
          data: [],
          borderColor: 'rgb(119, 170, 255)',
          pointBackgroundColor: 'rgb(119, 170, 255)',
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.3,
          pointStyle: 'circle',
        },
        {
          label: 'Maksimalna temperatura',
          data: [],
          borderColor: 'rgb(255, 119, 119)',
          pointBackgroundColor: 'rgb(255, 119, 119)',
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.3,
          pointStyle: 'circle',
        },
        {
          label: 'Precipitacija (padavine)',
          data: [],
          borderColor: 'rgb(102, 255, 178)',
          pointBackgroundColor: 'rgb(102, 255, 178)',
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.3,
          pointStyle: 'circle',
        },
      ],
    };

    data.forEach((item) => {
      chartData.labels.push(item.year);
      chartData.datasets[0].data.push(item.min_temperature);
      chartData.datasets[1].data.push(item.max_temperature);
      chartData.datasets[2].data.push(item.precipitation);
    });

    return chartData;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          padding: 34,
          usePointStyle: true,
          boxHeight: 10,
        }
      }
    }
  };

  useEffect(() => {
    // fetch data from API and update chartData state
    const fetchData = async () => {
      const response = await fetch(props.apiUrl);
      const data = await response.json();
      setChartData(data);
    };
    fetchData();
  }, [props.apiUrl]);

  return <Line data={transformData(chartData)} options={options} />;
}
