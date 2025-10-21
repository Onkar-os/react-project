import React, { useEffect, useState } from "react";
import axios from "axios";

function GetWeather() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Pune");
  const [error, setError] = useState("");

  const apiKey = "1fdbbcf72b707cb401e4157ded87cabd"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetchWeather();
  }, []);

  async function fetchWeather() {
    try {
      const res = await axios.get(apiUrl);
      setData(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("City not found or API error");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🌤️ Weather App</h2>

      {/* Search Box */}
      <form onSubmit={handleSubmit} className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control w-25 me-2"
          placeholder="Enter city name"
          required
        />
        <button type="submit" className="btn btn-primary">
          Get Weather
        </button>
      </form>

      {/* Weather Display */}
      {error && <p className="text-danger">{error}</p>}

      {data ? (
        <div className="card mx-auto shadow p-3" style={{ width: "20rem" }}>
          <h4 className="card-title mb-2">{data.name}</h4>
          <h5 className="text-muted">{data.weather[0].main}</h5>
          <h2 className="text-success mb-3">{data.main.temp}°C</h2>
          <p>🌡️ Min: {data.main.temp_min}°C | Max: {data.main.temp_max}°C</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>🌬️ Wind: {data.wind.speed} m/s</p>
        </div>
      ) : (
        !error && <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default GetWeather;
