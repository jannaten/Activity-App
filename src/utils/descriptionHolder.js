import React from "react";

function descriptionHolder({ desc }) {
  if (desc === "clear sky")
    return (
      <>
        <ul>
          <li>Clear Sky outside</li>
          <li>Go out and do your activity</li>
        </ul>
      </>
    );
  else if (desc === "few clouds")
    return (
      <ul>
        <li>Few clouds outside</li>
        <li>Not gonna rain within hour</li>
        <li>So, you can do some activity</li>
      </ul>
    );
  else if (desc === "scattered clouds")
    return (
      <ul>
        <li>Clouds covering 1/10 to 1/2 of the sky</li>
        <li>You can make some activity</li>
      </ul>
    );
  else if (desc === "broken clouds")
    return (
      <ul>
        <li>Broken Clouds are visible</li>
        <li>Might rain within half an hour</li>
        <li>Make sure you take umbrella</li>
      </ul>
    );
  else if (desc === "shower rain")
    return (
      <ul>
        <li>Its raining like shower.</li>
        <li>Make sure you take umbrella</li>
      </ul>
    );
  else if (desc === "rain")
    return (
      <ul>
        <li>Its raining outside</li>
        <li>Make sure you take umbrella</li>
      </ul>
    );
  else if (desc === "thunderstorm")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside! Just Don't</li>
      </ul>
    );
  else if (desc === "mist")
    return (
      <ul>
        <li>Mist! an example of a dispersion</li>
        <li>You might start your activity</li>
      </ul>
    );
  else if (desc === "thunderstorm with light rain")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "thunderstorm with rain")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "thunderstorm with heavy rain")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "light thunderstorm")
    return (
      <ul>
        <li>Its {desc} outside</li>
        <li>Don't go outside. No activity outside.</li>
      </ul>
    );
  else if (desc === "heavy thunderstorm")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "ragged thunderstorm")
    return (
      <ul>
        <li>Its {desc} outside</li>
        <li>Don't go outside</li>
      </ul>
    );
  else if (desc === "thunderstorm with light drizzle")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "thunderstorm with drizzle")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "thunderstorm with heavy drizzle")
    return (
      <ul>
        <li>Its {desc}</li>
        <li>Don't go outside. Just don't</li>
      </ul>
    );
  else if (desc === "light intensity drizzle")
    return (
      <ul>
        <li>There's light intensity of drizzle outside</li>
        <li>You can do activity</li>
      </ul>
    );
  else if (desc === "drizzle")
    return (
      <ul>
        <li>Its drizzely outside</li>
        <li>Walk carefully outside.</li>
      </ul>
    );
  else if (desc === "heavy intensity drizzle")
    return (
      <ul>
        <li>There's heavy intensity of drizzle outside</li>
        <li>Make sure you have a good shoe while walking</li>
      </ul>
    );
  else if (desc === "light intensity drizzle rain")
    return (
      <ul>
        <li>Its light intensity of drizzle with rain outside</li>
        <li>You can go out if want</li>
      </ul>
    );
  else if (desc === "drizzle rain")
    return (
      <ul>
        <li>Its just drizzling rain outside</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "heavy intensity drizzle rain")
    return (
      <ul>
        <li>Its heavy intensity of drizzle with rain outside</li>
        <li>Better not to go outside.</li>
      </ul>
    );
  else if (desc === "shower rain and drizzle")
    return (
      <ul>
        <li>Its drizzly with showely rain.</li>
        <li>Better not to go out.</li>
      </ul>
    );
  else if (desc === "heavy shower rain and drizzle")
    return (
      <ul>
        <li>Its drizzly with heavy showely rain.</li>
        <li>Make sure you have an umbrealla while outside.</li>
      </ul>
    );
  else if (desc === "shower drizzle")
    return (
      <ul>
        <li>Its {desc} outside.</li>
        <li>Can perform some activities.</li>
      </ul>
    );
  else if (desc === "light rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "moderate rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "heavy intensity rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "very heavy rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "extreme rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "freezing rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "light intensity shower rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "shower rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "heavy intensity shower rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "ragged shower rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "light snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Heavy snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Sleet")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Light shower sleet")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Shower sleet")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Light rain and snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Rain and snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Light shower snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Shower snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Heavy shower snow")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Smoke")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "Haze")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "sand/ dust whirls")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "fog")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "sand")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "dust")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "volcanic ash")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "squalls")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "tornado")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "few clouds: 11-25%")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "scattered clouds: 25-50%")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "broken clouds: 51-84%")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "overcast clouds: 85-100%")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else return <p>The weather is like now {desc}</p>;
}

export default descriptionHolder;

// function descriptionHolder({ desc }) {
//   return desc === "Haze" ? (
//     <p>The weather is hazzy</p>
//   ) : null || desc === "light intensity shower rain" ? (
//     <p>Its gonna be light rain outside!!!</p>
//   ) : null || desc === "overcast clouds" ? (
//     <p>There is some overcase clouds outside</p>
//   ) : null;
// }
