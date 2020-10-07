import React, { useState } from "react";
import snowPng from "../../assets/img/snow.png";
import windPng from "../../assets/img/wind.png";
import cloudyPng from "../../assets/img/cloudy.png";
import stormPng from "../../assets/img/storm.png";
import rainPng from "../../assets/img/rain.png";
import sunPng from "../../assets/img/sun.png";

function City({ name, rainfall, temp, isEdit, fixScreen, selectImage }) {
  const [inputTemperature, setInputTemperature] = useState(temp);
  const [inputRainfall, setInputRainfall] = useState(rainfall);
  const [selectImg, setSelectImg] = useState(selectImage);

  const selectRainfall = (rainfall) => {
    let selectInput = "";
    switch (rainfall) {
      case "Snow":
        selectInput = snowPng;
        break;
      case "Squall":
        selectInput = windPng;
        break;
      case "Clouds":
        selectInput = cloudyPng;
        break;
      case "Thunderstorm":
        selectInput = stormPng;
        break;
      case "Rain":
        selectInput = rainPng;
        break;
      case "Clear":
        selectInput = sunPng;
        break;
      default:
        break;
    }
    setSelectImg(selectInput);
  };

  return (
    <tr className="weather">
      <td className="weather__city">{name}</td>
      <td className="weather__temperature">
        <div className="input-wrap">
          <input
            disabled={!isEdit}
            className={isEdit ? "input--edit" : ""}
            onChange={(e) => {
              setInputTemperature(e.target.value);
            }}
            value={inputTemperature}
            type="text"
          />
          <span className={fixScreen ? "fix--screenshot" : ""}>°C</span>
        </div>
      </td>
      <td className="weather__rainfall">
        <div className="img-wrap">
          <img src={selectImg} alt="" />
        </div>
        <select
          disabled={!isEdit}
          className={isEdit ? "select--edit" : ""}
          value={inputRainfall}
          name="rainfall"
          id="rainfall"
          onChange={(e) => {
            setInputRainfall(e.target.value);
            selectRainfall(e.target.value);
          }}
        >
          <option value="Snow">Снег</option>
          <option value="Squall">Ветер</option>
          <option value="Clouds">Облачно</option>
          <option value="Thunderstorm">Гроза</option>
          <option value="Rain">Дождь</option>
          <option value="Clear">Без осадков</option>
        </select>
      </td>
    </tr>
  );
}

export default City;
