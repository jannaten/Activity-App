import React from "react";

function descriptionHolder({ desc }) {
  if (desc === "haze")
    return (
      <>
        <ul>
          <li>Its hazzy outside.</li>
          <li>Try to use mask while walking</li>
        </ul>
      </>
    );
  else if (desc === "light intensity shower rain")
    return (
      <ul>
        <li>Its hazzy outside.</li>
        <li>Try to use mask while walking</li>
      </ul>
    );
  else if (desc === "overcast clouds")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "few clouds")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "clear sky")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "scattered clouds")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "moderate rain")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "broken clouds")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "light rain")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "mist") return <p>There is some overcase clouds outside</p>;
  else if (desc === "thunderstorm")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "smoke")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "fog") return <p>There is some overcase clouds outside</p>;
  else if (desc === "very heavy rain")
    return <p>There is some overcase clouds outside</p>;
  else if (desc === "light intensity drizzle")
    return <p>There is some overcase clouds outside</p>;
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
