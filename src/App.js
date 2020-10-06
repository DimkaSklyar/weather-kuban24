import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import download from "downloadjs";
import classNames from "classnames";
import axios from "axios";

import City from "./components/City";

import DB from "./assets/db.json";

import "normalize.css";
import "./scss/index.scss";

import logoPng from "./assets/img/logo.png";

function App() {
  const [inputEdit, setInputEdit] = useState(false);
  const [fixScreenshot, setFixScreenshot] = useState(false);
  const [listCity, setListCity] = useState(DB[0].city);

  console.log(listCity);

  const getWeather = () => {
    console.log(listCity);
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/group?id=491422,480716,561667,518255,582182,540251,492094,505259,466885,483029,540761,580922,537281,577893,559317,542420&appid=9f4bf0cb0061518817d957d542cb826e&units=metric&lang=ru"
      )
      .then((response) => {
        const newList = DB[0].city.map((city, index) => {
          city.temp = response.data.list[index].main.temp;
          return city;
        });
        setListCity(newList);
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
    console.log(window.pageYOffset);
    setFixScreenshot(true);
    setTimeout(() => {
      html2canvas(document.querySelector("#capture"), {
        scrollY: -window.pageYOffset,
        x: 0,
        windowWidth: document.querySelector("#capture").scrollWidth,
      }).then((canvas) => {
        download(canvas.toDataURL());
      });
      setFixScreenshot(false);
    }, 2000);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="container" id="capture">
          <h1>
            Погода на&nbsp;
            <input
              type="text"
              disabled={!inputEdit}
              className={classNames("date", {
                "date--edit": inputEdit,
              })}
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
                  key={Math.random()}
                  temp={city.temp}
                  name={city.name}
                  isEdit={inputEdit}
                  fixScreen={fixScreenshot}
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
          {!inputEdit ? "Редактировать" : "Закончть редактирование"}
        </button>
        <button className="btn" onClick={onScreenshot} disabled={inputEdit}>
          {fixScreenshot ? "Сохранение..." : "Сохранить"}
        </button>
        <button className="btn" onClick={() => getWeather()}>
          Получить данные с Яндекс.Погоды
        </button>
      </div>
    </div>
  );
}

export default App;
