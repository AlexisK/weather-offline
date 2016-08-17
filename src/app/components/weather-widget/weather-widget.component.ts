import {Component, Input, AfterViewInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';


@Component({
    selector    : 'weather-widget',
    templateUrl : 'app/components/weather-widget/weather-widget.component.html',
    styleUrls   : ['app/components/weather-widget/weather-widget.component.css']
})

export class WeatherWidgetComponent implements AfterViewInit {
    @Input('place') place;
    private forecast: any;

    constructor(public weatherService: WeatherService) {
    }

    ngAfterViewInit() {
        this.weatherService.getForecast(this.place).then(forecast => this.forecast = forecast);
    }
}
