import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import download from "downloadjs";
import axios from "axios";

import City from "./components/City";

import DB from "./assets/db.json";

import snowPng from "./assets/img/snow.png";
import windPng from "./assets/img/wind.png";
import cloudyPng from "./assets/img/cloudy.png";
import stormPng from "./assets/img/storm.png";
import rainPng from "./assets/img/rain.png";
import sunPng from "./assets/img/sun.png";

import "normalize.css";
import "./scss/index.scss";

import logoPng from "./assets/img/logo.png";

function App() {
  const [inputEdit, setInputEdit] = useState(false);
  const [fixScreenshot, setFixScreenshot] = useState(false);
  const [listCity, setListCity] = useState(DB[0].city);
  const [isLoading, setIsLoading] = useState(false);

  const savedRefImg = useRef();

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
    return selectInput;
  };

  const getWeather = () => {
    setIsLoading(true);
    const getCitys = DB[0].city.map((city) =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=current,minutely,hourly,alertslang=ru&units=metric&appid=a2cd1d02acda23219565accafe27132b`
      )
    );
    let newList = [];
    Promise.all(getCitys)
      .then((response) => {
        response.forEach((res) => {
          newList.push(res.data);
        });
      })
      .then(
        (r) =>
          (newList = DB[0].city.map((city, index) => {
            city.id = (newList[index].lat + newList[index].lon).toFixed(2);
            city.temp =
              newList[index].daily[1].temp.max.toFixed() > 0
                ? `+${newList[index].daily[1].temp.max.toFixed()}`
                : `-${newList[index].daily[1].temp.max.toFixed()}`;
            city.rainfall = newList[index].daily[1].weather[0].main;
            return city;
          }))
      )
      .then((r) => {
        setListCity(newList);
        setIsLoading(false);
      });
  };

  const date = new Date();

  const formatDate = (date) => {
    var dd = date.getDate() + 1;
    if (dd < 10) dd = "0" + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = "0" + yy;

    return dd + "." + mm + "." + yy;
  };

  const [inputDate, setInputDate] = useState(formatDate(date));

  const onScreenshot = () => {
    setFixScreenshot(true);
    setTimeout(() => {
      html2canvas(savedRefImg.current, {
        scrollY: -window.pageYOffset,
        x: 0,
        windowWidth: savedRefImg.current.scrollWidth,
      }).then((canvas) => {
        download(canvas.toDataURL());
      });
      setFixScreenshot(false);
    }, 2000);
  };

  return (
    <div>
      <div className="wrapper">
        <div ref={savedRefImg} className="container">
          <h1>
            Погода на&nbsp;
            <input
              type="text"
              disabled={!inputEdit}
              className={`date ${!!inputEdit ? "date--edit" : ""}`}
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
          </h1>
          <table className="table__weather">
            <thead>
              <tr>
                <th>Город</th>
                <th>Температура</th>
                <th>Осадки</th>
              </tr>
            </thead>
            <tbody>
              {listCity.map((city) => (
                <City
                  key={city.id}
                  temp={city.temp}
                  name={city.name}
                  isEdit={inputEdit}
                  rainfall={city.rainfall}
                  fixScreen={fixScreenshot}
                  selectImage={() => selectRainfall(city.rainfall)}
                ></City>
              ))}
            </tbody>
          </table>
          <div className="copyright">
            <p>
              Прогноз погоды по данным Краснодарского краевого центра по
              гидрометеорологии и мониторингу окружающей среды
            </p>
            <div className="logo">
              <img src={logoPng} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="edit__wrapper">
        <button
          className="btn"
          onClick={() => {
            setInputEdit(!inputEdit);
          }}
        >
          {!inputEdit ? "Редактировать" : "Закончить редактирование"}
        </button>
        <button className="btn" onClick={onScreenshot} disabled={inputEdit}>
          {fixScreenshot ? "Сохранение..." : "Сохранить"}
        </button>
        <button className="btn" onClick={() => getWeather()}>
          {!isLoading
            ? `Автоматическое заполение на ${formatDate(date)}`
            : "Загрузка данных..."}
        </button>
      </div>
    </div>
  );
}

export default App;
