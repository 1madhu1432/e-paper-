import React, { useState } from 'react';
import { CloudSun, Droplets, Wind, Eye, Thermometer, MapPin, RefreshCw } from 'lucide-react';

const DISTRICTS = [
  { name: 'హైదరాబాద్', temp: 32, humidity: 65, wind: 14, condition: 'పాక్షిక మేఘావృతం', icon: '⛅', high: 35, low: 24, visibility: 8 },
  { name: 'వరంగల్', temp: 29, humidity: 72, wind: 11, condition: 'మేఘావృతం', icon: '🌥️', high: 33, low: 22, visibility: 6 },
  { name: 'విజయవాడ', temp: 34, humidity: 70, wind: 16, condition: 'సన్నని వర్షం', icon: '🌦️', high: 37, low: 26, visibility: 5 },
  { name: 'విశాఖపట్నం', temp: 30, humidity: 80, wind: 20, condition: 'తేలికపాటి వర్షం', icon: '🌧️', high: 32, low: 25, visibility: 7 },
  { name: 'తిరుపతి', temp: 36, humidity: 55, wind: 12, condition: 'ఎండగా ఉంది', icon: '☀️', high: 39, low: 28, visibility: 10 },
  { name: 'నిజామాబాద్', temp: 28, humidity: 68, wind: 9, condition: 'మేఘావృతం', icon: '🌥️', high: 31, low: 21, visibility: 7 },
  { name: 'కాకినాడ', temp: 31, humidity: 82, wind: 22, condition: 'తేలికపాటి వర్షం', icon: '🌧️', high: 33, low: 25, visibility: 6 },
  { name: 'కర్నూలు', temp: 35, humidity: 50, wind: 13, condition: 'ఎండగా ఉంది', icon: '☀️', high: 38, low: 27, visibility: 10 },
];

const FORECAST = [
  { day: 'ఈరోజు', icon: '⛅', high: 35, low: 24 },
  { day: 'రేపు', icon: '🌦️', high: 33, low: 22 },
  { day: 'మాప్టి', icon: '🌧️', high: 29, low: 21 },
  { day: 'గురువారం', icon: '🌥️', high: 31, low: 23 },
  { day: 'శుక్రవారం', icon: '☀️', high: 36, low: 25 },
  { day: 'శనివారం', icon: '☀️', high: 38, low: 27 },
  { day: 'ఆదివారం', icon: '⛅', high: 34, low: 24 },
];

export const WeatherPage: React.FC = () => {
  const [selected, setSelected] = useState(DISTRICTS[0]);
  const [refreshed, setRefreshed] = useState(false);

  const handleRefresh = () => {
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900">
      {/* Hero weather card */}
      <div className="relative overflow-hidden px-4 pt-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <CloudSun className="w-8 h-8 text-yellow-400" /> వాతావరణం
              </h1>
              <p className="text-blue-300 text-sm mt-1">తెలుగు రాష్ట్రాల వాతావరణ సమాచారం</p>
            </div>
            <button onClick={handleRefresh}
              className={`p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all ${refreshed ? 'animate-spin' : ''}`}>
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Main weather card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-300 text-sm mb-2">
                  <MapPin className="w-4 h-4" /> {selected.name}
                </div>
                <div className="text-8xl font-thin text-white mb-2">{selected.temp}°</div>
                <div className="text-2xl text-blue-200 mb-1">{selected.condition}</div>
                <div className="flex gap-4 text-blue-300 text-sm">
                  <span>↑ {selected.high}°</span>
                  <span>↓ {selected.low}°</span>
                </div>
              </div>
              <div className="text-8xl">{selected.icon}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <Droplets className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                <div className="text-white font-semibold">{selected.humidity}%</div>
                <div className="text-blue-400 text-xs">తేమ</div>
              </div>
              <div className="text-center">
                <Wind className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                <div className="text-white font-semibold">{selected.wind} km/h</div>
                <div className="text-blue-400 text-xs">వేగం</div>
              </div>
              <div className="text-center">
                <Eye className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                <div className="text-white font-semibold">{selected.visibility} km</div>
                <div className="text-blue-400 text-xs">దృశ్యమానత</div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-6">
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">7 రోజుల అంచనా</h3>
            <div className="grid grid-cols-7 gap-2">
              {FORECAST.map(f => (
                <div key={f.day} className="text-center">
                  <div className="text-blue-400 text-xs mb-2">{f.day}</div>
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="text-white text-xs font-semibold">{f.high}°</div>
                  <div className="text-blue-400 text-xs">{f.low}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* District list */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-orange-400" /> జిల్లాల వాతావరణం
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DISTRICTS.map(d => (
            <div
              key={d.name}
              onClick={() => setSelected(d)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                selected.name === d.name
                  ? 'bg-white/20 border-white/40 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="text-3xl">{d.icon}</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{d.name}</div>
                <div className="text-blue-300 text-xs">{d.condition}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-xl">{d.temp}°</div>
                <div className="text-blue-400 text-xs">↑{d.high}° ↓{d.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
