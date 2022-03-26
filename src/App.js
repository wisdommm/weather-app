import weatherLogo from './image';
import Detail from './detail';
import './App.css';
import { useEffect, useState } from 'react';

const dayMap = ['周日','周一','周二','周三','周四','周五','周六',];

function App() {
  const [now, setNow] = useState({});
  const [hourRes, setHourRes] = useState([]);
  const [dayRes, setDayRes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    requestWeather();
  }, []);

  const requestWeather = async () => {
    // 当前及24h数据
    const hour_result = await fetch('https://devapi.qweather.com/v7/weather/now?location=101210106&key=d822b681e139418ea3e02807da626ada').then(data => data.json());
    if (hour_result.code === '200') {
      setNow(hour_result.now);
      const hourList = Array(24).fill(hour_result.now).map((e, index) => {
        let temp;
        if (Math.random() < 0.5) {
          temp = +e.temp + Math.random() * 8;
        } else {
          temp = +e.temp - Math.random() * 8;
        }
        const hour = new Date(+new Date() + 3600000 * index).getHours();
        return Object.assign({}, e, {
          hour,
          temp: Math.floor(temp)
        });
      });
      setHourRes(hourList);
    } else {
      throw new Error('request error');
    }
    // 未来7d数据
    const day_result = await fetch('https://devapi.qweather.com/v7/weather/3d?location=101210106&key=d822b681e139418ea3e02807da626ada').then(data => data.json());
    if (day_result.code === '200') {
      let weatherList = day_result.daily;
      weatherList = weatherList.concat(weatherList, weatherList[0]).map((item, index) => {
        const time = +new Date() + 86400000 * index;
        const year = new Date(time).getFullYear();
        const monuth = new Date(time).getMonth() + 1;
        const date = new Date(time).getDate();
        const fxDate = `${year}-${monuth}-${date}`;
        return Object.assign({}, item, {
          fxDate,
        });
      });
      setDayRes(weatherList);
    } else {
      throw new Error('request error');
    }
  };
  const nowTime = new Date(now.obsTime);
  const timeText = dayMap[nowTime.getDay()] + ' ' + nowTime.getHours() + (nowTime.getHours() > 12 ? 'pm' : 'am');
  const weather = (text) => {
    if (text) {
      return text.includes('雨') ? 'rain' : 
      now.text?.includes('雪') ? 'snow' : 
      now.text?.includes('晴') ? 'sun' :
      now.text?.includes('云') ? 'cloud' : 'overcast';
    }
    return '';
  }
  return (
    <div className="App">
      {
        page === 1 ? <div className="container">
        <div className="content">
          <img
            className="weatherLogo"
            src={weatherLogo[weather(now.text)]}
            style={{
              opacity: now.text ? 1 : 0
            }}
          />
          <div className="position">杭州市, 浙江省</div>
          <div className="description">
            <div className="wrapper">
              <span className="temperature">{now.temp || '*'}<span className="icon">°c</span></span>
              <span className="date">{now.obsTime ? timeText : '*'}</span>
            </div>
            <div className="wrapper">
              <span className="desc1">{now.windDir}</span>
              <span className="desc1 desc2">{now.text}</span>
            </div>
          </div>
          <div className="detail" onClick={() => setPage(2)}>详情</div>
        </div>
        <div>
          <ul className="tips">
            <li className="item">
              <span>
                <img className="icon" src={weatherLogo.rainIcon} />降水
              </span>
              <span className="tip">{now.vis}%</span>
            </li>
            <li className="item">
              <span>
                <img className="icon temIcon" src={weatherLogo.temIcon} />湿度
              </span>
              <span className="tip">{now.humidity}%</span>
            </li>
            <li className="item">
              <span>
                <img className="icon" src={weatherLogo.windIcon} />风速
              </span>
              <span className="tip">{now.windSpeed}km/h</span>
            </li>
          </ul>
        </div>
      </div> : <Detail setPage={setPage} hourRes={hourRes} dayMap={dayMap} weather={weather} dayRes={dayRes} now={now} />
      }
    </div>
  );
}

export default App;
