import {Component, Input} from '@angular/core';


@Component({
    selector    : '[ico]',
    templateUrl : 'app/components/ico/ico.component.html',
    styleUrls   : ['app/components/ico/ico.component.css']
})

export class IcoComponent {
    @Input('ico') ico;

    constructor() {
    }
}
