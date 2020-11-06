export const fetchUrl = (defaultCity, API_KEY) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}`;
