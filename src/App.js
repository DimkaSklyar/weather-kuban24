import React, { useState } from "react";
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
  const getWeather = () => {
    axios
      .get(
        "https://api.weather.yandex.ru/v2/forecast?lat=55.75396&lon=37.620393&extra=true",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "X-Yandex-API-Key": "22d965d2-5ec9-418d-a7f8-1b8719700270",
          },
        }
      )
      .then((result) => console.log(result));
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
  const [inputEdit, setInputEdit] = useState(false);
  const [fixScreenshot, setFixScreenshot] = useState(false);

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
              {DB[0].city.map((city) => (
                <City
                  key={city.id}
                  {...city}
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
        <button className="btn" onClick={() => setInputEdit(!inputEdit)}>
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
