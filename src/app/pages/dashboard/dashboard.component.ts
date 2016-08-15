import {Component} from '@angular/core';
import {StateService} from "../../general/state.service";


@Component({
    selector    : 'page-dashboard',
    templateUrl : 'app/pages/dashboard/dashboard.component.html',
    styleUrls   : ['app/pages/dashboard/dashboard.component.css']
})

export class dashboardComponent {
    constructor(public state: StateService) {
    }
}

export const route = {path : '', component : dashboardComponent};



