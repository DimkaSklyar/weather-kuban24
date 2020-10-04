import React from "react";
import sunPng from "../../assets/img/sun.png";

function City({ name, rainfall, temperature }) {
  return (
    <tr className="weather">
      <td className="weather__city">{name}</td>
      <td className="weather__temperature">{temperature}°C</td>
      <td className="weather__rainfall">
        <img src={sunPng} alt="Снег" /> {rainfall}
      </td>
    </tr>
  );
}

export default City;
