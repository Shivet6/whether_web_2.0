export interface LocationData { name:string; country:string; region?:string; latitude:number; longitude:number; timezone?:string; }
export interface CurrentWeather { temperature:number; feelsLike:number; highTemperature:number; lowTemperature:number; condition:string; description:string; icon:string; humidity:number; windSpeed:number; windDirection?:number; visibility:number; pressure:number; uvIndex:number; cloudCoverage:number; sunrise:string; sunset:string; }
export interface HourlyForecastItem { time:string; temperature:number; condition:string; icon:string; precipitationChance?:number; }
export interface DailyForecastItem { date:string; minTemperature:number; maxTemperature:number; condition:string; icon:string; precipitationChance?:number; }
export interface WeatherData { location:LocationData; current:CurrentWeather; hourly:HourlyForecastItem[]; daily:DailyForecastItem[]; }
