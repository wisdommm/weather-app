import React from 'react';
import Image from '../image/index';
import './index.css'

function Detail(props) {
  const {
    now = {},
    dayRes = [],
    hourRes = [],
    dayMap,
    weather,
    setPage,
  } = props;  
  return (
    <div>
      <img className="detail-back" src={Image.back} onClick={() => setPage(1)} />
      <img className="detail-weather" src={Image[weather(now.text)]} />
      <p className="detail-position">
        <span>浙江省,</span>
        <span>杭州市</span>
      </p>
      <div className="detail-temp">
        {now.temp || '*'}
        <span className="detail-icon">°c</span>
      </div>
      <div className="detail-list">
        <ul className="detail-tips">
          <li
            className="detail-item"
            style={{
              color: 'rgba(101, 142, 217, 1)',
              background: 'rgba(101, 142, 217, 0.1)',
            }}
          >
            <img className="detail-image" src={Image.nounRain} />
            <span className="detail-tip">{now.vis}%</span>
          </li>
          <li
            className="detail-item"
            style={{
              color: 'rgba(216, 97, 145, 1)',
              background: 'rgba(216, 97, 145, 0.1)',
            }}
          >
            <img className="detail-image" src={Image.nounHumidity} />
            <span className="detail-tip">{now.humidity}%</span>
          </li>
          <li
            className="detail-item"
            style={{
              color: 'rgba(94, 79, 193, 1)',
              background: 'rgba(94, 79, 193, 0.1)',
            }}
          >
            <img className="detail-image" src={Image.nounWind} />
            <span className="detail-tip">{now.windSpeed}km/h</span>
          </li>
        </ul>
      </div>
      <div className="detail-footer">
        <img className="detail-today" src={Image.today} />
        <div className="detail-24hour">
          {
            hourRes.map((e) => {
              return (
                <div key={e.hour} className="detail-timeItem">
                  <span className="detail-timeTemp">
                    {e.temp}
                    <span className="detail-timeIcon">°c</span>
                  </span>
                  <span className="detail-timeHour">{e.hour + (e.hour > 11 ? 'pm' : 'am')}</span>
                </div>
              );
            })
          }
        </div>
        {
          dayRes.map((day, index) => {
            const weatherList = ['sun', 'rain', 'cloud', 'overcast'];
            const days = new Date(day.fxDate).getDay();
            return (
              <p key={day.fxDate} className="detail-daysItem">
                <span className="detail-daysDay">{
                  dayMap[days]
                }</span>
                <img className="detail-daysImg" src={index === 0 ? Image[weather(day.textDay)] : Image[weatherList[Math.floor(Math.random() * 4)]] } />
                <span className="detail-daysTemp">
                  {day.tempMax}
                  <span className="detail-daysIcon">°c</span>
                </span>
              </p>
            );
          })
        }
      </div>
    </div>
  );
}

export default Detail;
