import React, { useState } from 'react';
import './App.css';

const HavaDurumu = () => {
  const [sehir, setSehir] = useState('');   
  const [hava, setHava] = useState(null);   
  const [error, setError] = useState('');   
  const API_KEY = '6d5d93aa370e0f499e488d3b875e8b30'; 

  const getHavadurumu = async () => {
    if (!sehir) return; 

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${sehir},tr&appid=${API_KEY}&units=metric`
      );
      const data = await response.json(); 
      setHava(data); 
      setError(''); 
    } catch (error) {
      setHava(null); 
      setError('Şehir Bulunamadı'); 
    }
  };

  const durumCevir = (ingilizceDurum) => {
    const ceviri = {
      "clear sky": "açık",
      "few clouds": "az bulutlu",
      "scattered clouds": "dağınık bulutlar",
      "broken clouds": "parçalı bulutlu",
      "shower rain": "sağanak yağış",
      "rain": "yağmurlu",
      "thunderstorm": "gök gürültülü",
      "snow": "karlı",
      "mist": "sisli",
    };
  
    return ceviri[ingilizceDurum] || ingilizceDurum;
  };

  return (
    <div className="container">
      <h1 className="title">TRWeather</h1>

      <input
        type="text"
        placeholder="Şehir Giriniz"
        value={sehir}
        onChange={(e) => setSehir(e.target.value)} 
        className="city-input"
      />
      <div className="button-container">
  <button onClick={getHavadurumu} className="get-weather-btn">
    Hava Durumunu Kontrol Et
  </button>
</div>

      {error && <p className="error-message">{error}</p>}

      {hava && (
  <div className="Hava-Bilgisi">
    <h2>{hava.name}</h2>
    <p>Sıcaklık: {hava.main.temp}°C</p>
    <p>Durum: {durumCevir(hava.weather[0].description)}</p>
    <p>Nem: {hava.main.humidity}%</p>
    <p>Rüzgar Hızı: {hava.wind.speed} m/s</p>
  </div>
)}
    </div>
  );
};

export default HavaDurumu;
