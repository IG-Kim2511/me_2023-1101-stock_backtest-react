import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlphaVantageAPIKey = 'YOUR_ALPHA_VANTAGE_API_KEY';

function MovingAverageChart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define the Alpha Vantage API URL for the 150-day moving average of QQQ
    const apiUrl = `https://www.alphavantage.co/query?function=SMA&symbol=QQQ&interval=daily&time_period=150&series_type=close&apikey=${AlphaVantageAPIKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const movingAverageData = response.data['Technical Analysis: SMA'];
        const movingAverageValues = Object.entries(movingAverageData).map(([date, value]) => ({
          date,
          value: parseFloat(value['SMA']),
        }));
        setData(movingAverageValues);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>QQQ 150-Day Moving Average</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((entry) => (
            <li key={entry.date}>
              Date: {entry.date}, Moving Average: {entry.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovingAverageChart;
