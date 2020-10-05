import React, { useState } from "react";
import snowPng from "../../assets/img/snow.png";
import windPng from "../../assets/img/wind.png";
import cloudyPng from "../../assets/img/cloudy.png";
import stormPng from "../../assets/img/storm.png";
import rainPng from "../../assets/img/rain.png";
import sunPng from "../../assets/img/sun.png";
import classNames from "classnames";

function City({ name, rainfall, temperature, isEdit, fixScreen }) {
  const [inputTemperature, setInputTemperature] = useState(temperature);
  const [inputRainfall, setInputRainfall] = useState(rainfall);
  const [selectImg, setSelectImg] = useState(snowPng);

  const selectRainfall = (rainfall) => {
    let selectInput = "";
    console.log(rainfall);
    switch (rainfall) {
      case "snow":
        selectInput = snowPng;
        break;
      case "wind":
        selectInput = windPng;
        break;
      case "cloudy":
        selectInput = cloudyPng;
        break;
      case "storm":
        selectInput = stormPng;
        break;
      case "rain":
        selectInput = rainPng;
        break;
      case "sun":
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
            className={classNames({
              "input--edit": isEdit,
            })}
            onChange={(e) => {
              setInputTemperature(e.target.value);
            }}
            value={inputTemperature}
            type="text"
          />
          <span
            className={classNames({
              "fix--screenshot": fixScreen,
            })}
          >
            °C
          </span>
        </div>
      </td>
      <td className="weather__rainfall">
        <div className="img-wrap">
          <img src={selectImg} alt="Снег" />
        </div>
        <select
          disabled={!isEdit}
          className={classNames({
            "select--edit": isEdit,
          })}
          value={inputRainfall}
          name="rainfall"
          id="rainfall"
          onChange={(e) => {
            setInputRainfall(e.target.value);
            selectRainfall(e.target.value);
          }}
        >
          <option value="snow">Снег</option>
          <option value="wind">Ветер</option>
          <option value="cloudy">Облачно</option>
          <option value="storm">Гроза</option>
          <option value="rain">Дождь</option>
          <option value="sun">Солнце</option>
        </select>
      </td>
    </tr>
  );
}

export default City;
