export  interface WeatherWoied {
    consolidated_weather:ConsolidateWeather[],
    time: Date,
    sun_rise: Date,
    sun_set: Date,
    timezone_name: string,
    parent: WeatherWoiedParent,
    title: string,
      location_type: string,
      woeid: number,
      latt_long: string,
      timezone: string
  }
  export  interface ConsolidateWeather extends WeatherWoied{
    id: number,
    weather_state_name: string,
    weather_state_abbr: string,
    wind_direction_compass: string,
    created:Date,
    applicable_date:Date,
    min_temp: number,
    max_temp: number,
    the_temp: number,
    wind_speed: number,
    wind_direction: number,
    air_pressure:number,
    humidity: number,
    visibility: number,
    predictability: number
  }

    interface WeatherWoiedParent{
    title: string,
    location_type: string,
    woeid: number,
    latt_long: string,
  }

  export  interface LocationInfo {
    title: string;
    location_type: string;
    woeid: number;
    latt_long: string;
  }

  export interface ChartData {
    map(arg0: (entry: ChartData, index: number) => JSX.Element): import("react").ReactNode;
    value: number,
    date: Date
  }