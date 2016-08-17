import {Component} from '@angular/core';
import {StateService} from "../../services/state.service";


@Component({
    selector    : 'page-weather',
    templateUrl : 'app/pages/weather/weather.component.html',
    styleUrls   : ['app/pages/weather/weather.component.css']
})

export class weatherComponent {
    constructor(public state: StateService) {
    }
}

export const route = {path : 'weather', component : weatherComponent};



