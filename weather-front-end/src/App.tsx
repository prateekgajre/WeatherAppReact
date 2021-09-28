import React from 'react';
import './App.css';
import Asynchronous from './components/AsyncSearch';
import { WeatherWoied, ChartData } from './types/typesInfo';
import CurrentWeather from './components/CurrentWeather';
import LoadingIndicator from './components/LoadingIndicator';
const App = () => {
  const [weatherData, setWeatherData] = React.useState<WeatherWoied>();
  const [chartInfo, setChartData] = React.useState<ChartData>();
  const [thisIndexSelected, setThisIndexSelected] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const onChangeList = async (event: object, newValue: any) => {
    let uri = "http://localhost:4001/woeid?woeid=" + encodeURI(newValue && newValue.woeid);
    fetch(uri)
      .then(res => {
        setLoading(true);
        return res.json();
      }
      )
      .then(async res => {
        let weatherInfo: WeatherWoied = res;

        setWeatherData(weatherInfo);
        let chartData = await getChartData(weatherInfo);
        setChartData(chartData as ChartData);
        setLoading(false);
      });
    setLoading(false);
  }

  const getChartData = (weatherInfo: WeatherWoied) => {
    let consilatedWeather = weatherInfo.consolidated_weather;
    let chartData: any = [];
    consilatedWeather.map(rec => {
      let newRec = {
        date: rec.applicable_date,
        value: Math.ceil(rec.the_temp)
      }
      chartData.push(newRec);
    })
    return chartData as ChartData;
  }

  const onClickBarHandler = (data: ChartData, index: number) => {
    setThisIndexSelected(index);

  }

  return (
    <div className="container">
      {/* <LoadingIndicator open={loading}/>   */}
      <h1>Weather Finder</h1>
      <div className="App-header">

        <Asynchronous onChangeSelect={onChangeList} />
      </div>
      {loading === true ? <LoadingIndicator open={loading} /> : (weatherData !== undefined &&
        <CurrentWeather weatherData={weatherData} onClickedBar={onClickBarHandler} indexSelected={thisIndexSelected} />
      )}
    </div>
  );
}

export default App;
