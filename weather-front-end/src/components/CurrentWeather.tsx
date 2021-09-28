import React from 'react';
import './../App.css';
import { WeatherWoied, ChartData } from '../types/typesInfo';
import WeatherChart from '../components/WeatherChart';

type Props = {
    weatherData: WeatherWoied;
    onClickedBar: (data: ChartData, index: number) => void;
    indexSelected: number
};

const baseIconString = "https://www.metaweather.com/static/img/weather/";

export default function CurrentWeather(props: Props) {
    const [chartInfo, setChartData] = React.useState<ChartData>();
    let weatherInfo: WeatherWoied = props.weatherData;

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

    React.useEffect(() => {
        let chartData = getChartData(weatherInfo);
        setChartData(chartData as ChartData);
    }, [weatherInfo]);

    let selectedWeather = props && props.weatherData && props.weatherData.consolidated_weather && props.weatherData.consolidated_weather[props && props.indexSelected];

    return (<div className="weather-grid-main weather-grid-size">
        <div className="grid-container-current-weather">

            <div className="font-display font-color-1">
                <img src={baseIconString + (selectedWeather && selectedWeather.weather_state_abbr) + '.svg'} height='50' width='50'></img>
            </div>
            <div className="font-display font-color-1">{selectedWeather && selectedWeather.weather_state_name}</div>
            <div className="font-display font-color-1"></div>
            <div className="grid-item-current-weather-span font-display-temp font-color">{Math.ceil(selectedWeather && selectedWeather.the_temp)}<sup className="font-display-1" >&#176;C</sup> </div>
            <div className="font-display font-color-1">&#8593; &nbsp; {Math.ceil(selectedWeather && selectedWeather.max_temp)}</div>
            <div className="font-display font-color-1">&#8595; &nbsp; {Math.ceil(selectedWeather && selectedWeather.min_temp)}</div>
            <div className="font-display font-color-1">
                <div >
                    {Number((selectedWeather && selectedWeather.wind_speed).toFixed(2))} &nbsp; m/s
                </div>
                <div>
                    Wind Speed
                </div>
            </div>
            <div className="font-display font-color-1">
                <div>
                    {Number((selectedWeather && selectedWeather.visibility).toFixed(2))} &nbsp; m/s
                </div>
                <div>
                    Visibility
                </div>
            </div>
            <div className="font-display font-color-1">
                <div>
                    {Number((selectedWeather && selectedWeather.humidity).toFixed(2))} &nbsp; %
                </div>
                <div>
                    humidity
                </div>
            </div>

        </div>
        {chartInfo !== undefined &&
            <div ><WeatherChart chartInfo={chartInfo} onClickedBar={props && props.onClickedBar} indexSelected={props && props.indexSelected} /></div>}


    </div>);
}