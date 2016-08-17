import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

class WeatherResult {
    public location : string;
    public humidity : number;
    public pressure : number;
    public sunrise : string;
    public sunset : string;
    public temp : number;
    public date : Date;
    public windSpeed : number;
    public windTemp : number;
}


const farenheitToCelsius = function (val) {
    return parseInt((val - 32) / 0.18) / 10;
};

const mphToKmh = function (val) {
    return parseInt(val * 160.9344) / 100;
};


@Injectable()
export class WeatherService {

    constructor(private http : Http) {
    }

    getForecast(place : string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${place}')&format=json`)
                .map(res => res.json())
                .subscribe(resp => {
                    if (resp && resp.query && resp.query.count) {

                        let channel = resp.query.results.channel;

                        let result : WeatherResult = {
                            location  : `${channel.location.city} ${channel.location.country}`
                            humidity  : parseFloat(channel.atmosphere.humidity),
                            pressure  : parseFloat(channel.atmosphere.pressure),
                            sunrise   : channel.astronomy.sunrise,
                            sunset    : channel.astronomy.sunset,
                            temp      : farenheitToCelsius(channel.item.condition.temp),
                            date      : new Date(channel.item.condition.date),
                            windSpeed : mphToKmh(channel.wind.speed),
                            windTemp  : farenheitToCelsius(channel.wind.chill)
                        };

                        console.log(result, channel);
                        resolve(result);

                    } else {
                        reject(resp);
                    }
                });
        });
    }

}
