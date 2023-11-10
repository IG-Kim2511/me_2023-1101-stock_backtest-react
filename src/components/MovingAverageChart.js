import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovingAverageChart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const alphaVantageAPIKey = process.env.REACT_APP_ALPHAVANTAGE_KEY;

    // Define the Alpha Vantage API URLs for the 150-day moving average and daily closing prices of QQQ
    const movingAverageApiUrl = `https://www.alphavantage.co/query?function=SMA&symbol=QQQ&interval=daily&time_period=150&series_type=close&apikey=${alphaVantageAPIKey}`;
    const dailyPricesApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=QQQ&apikey=${alphaVantageAPIKey}`;

    // Fetch both datasets in parallel
    Promise.all([axios.get(movingAverageApiUrl), axios.get(dailyPricesApiUrl)])
      .then(([movingAverageResponse, dailyPricesResponse]) => {
        const movingAverageData = movingAverageResponse.data['Technical Analysis: SMA'];
        const dailyPricesData = dailyPricesResponse.data['Time Series (Daily)'];

        // Combine the data based on date
        const combinedData = Object.keys(movingAverageData).map((date) => ({
          date,
          movingAverage: parseFloat(movingAverageData[date]['SMA']),
          dailyPrice: parseFloat(dailyPricesData[date]['4. close']),
        }));

        setData(combinedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>QQQ 150-Day Moving Average with Daily Prices</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((entry) => (
            <li key={entry.date}>
              Date: {entry.date}, Moving Average: {entry.movingAverage}, Daily Price: {entry.dailyPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovingAverageChart;
