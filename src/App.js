import React from 'react';

import City from './components/City'

import DB from './assets/db.json'

import 'normalize.css'; // Note this
import './scss/index.scss';

import logoPng from './assets/img/logo.png'


console.log(DB);
function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Погода на 21.01.20</h1>
        <table className="table__weather">
          <thead>
            <tr>
              <th>Город</th>
              <th>Температура</th>
              <th>Осадки</th>
            </tr>
          </thead>
          <tbody>
            {
              DB[0].city.map((city) => (
                <City key={city.id} {...city}></City>
              ))
            }
          </tbody>
        </table>
        <div className="copyright">
          <p>Прогноз погоды по данным Краснодарского краевого центра
по гидрометеорологии и мониторингу окружающей среды</p>
          <div className="logo"><img src={logoPng} alt="" /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
