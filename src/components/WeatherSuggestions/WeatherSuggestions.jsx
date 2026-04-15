import React from 'react';
import { useSelector } from 'react-redux';
import { selectWeatherSummary, selectWeatherStatus } from '../../features/weather/weatherSelectors';
import styles from './WeatherSuggestions.module.scss';

const SUGGESTIONS = {
  'clear sky': ['Go for a run 🏃', 'Try outdoor yoga 🧘', 'Take a long walk 🚶', 'Ride your bike 🚴'],
  'few clouds': ['Perfect for a walk 🚶', 'Great for outdoor reading 📚', 'Light jog weather 🏃'],
  'scattered clouds': ['Good for a stroll 🚶', 'Outdoor coffee time ☕', 'Garden work 🌱'],
  'broken clouds': ['Indoor workout 💪', 'Catch up on reading 📖', 'Cook a new recipe 🍳'],
  'shower rain': ['Home workout 🏋️', 'Learn something new 📚', 'Meditate 🧘', 'Clean and organise 🗂️'],
  'rain': ['Stay cozy indoors 🏠', 'Watch a documentary 🎬', 'Journal writing ✍️'],
  'thunderstorm': ['Stay safe indoors ⚡', 'Board games 🎲', 'Deep work session 💻'],
  'snow': ['Build a snowman ☃️', 'Hot cocoa and a book ☕📖', 'Indoor stretching 🤸'],
  'mist': ['Light indoor yoga 🧘', 'Home tidying 🧹', 'Plan your week 📅'],
};

function getSuggestions(description) {
  if (!description) return [];
  const key = Object.keys(SUGGESTIONS).find((k) =>
    description.toLowerCase().includes(k)
  );
  return key ? SUGGESTIONS[key] : ['Stay active today! 💪'];
}

export default function WeatherSuggestions() {
  const summary = useSelector(selectWeatherSummary);
  const status = useSelector(selectWeatherStatus);

  if (status !== 'succeeded' || !summary) return null;

  const suggestions = getSuggestions(summary.description);

  return (
    <div className={styles.container}>
      <h2>Suggestions</h2>
      <div className={styles.weather}>
        <img
          src={`https://openweathermap.org/img/wn/${summary.icon}@2x.png`}
          alt={summary.description}
          width={40}
          height={40}
        />
        <span className={styles.desc}>{summary.description}</span>
        <span className={styles.tag}>{summary.isDay ? 'Daytime' : 'Nighttime'}</span>
      </div>
      <ul className={styles.list}>
        {suggestions.map((s, i) => (
          <li key={i} className={styles.item}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
