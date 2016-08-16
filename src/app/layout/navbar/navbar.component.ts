import {Component, ViewEncapsulation} from '@angular/core';


@Component({
    selector      : 'navbar',
    templateUrl   : 'app/layout/navbar/navbar.component.html',
    styleUrls     : ['app/layout/navbar/navbar.component.css'],
    encapsulation : ViewEncapsulation.None
})

export class navbarComponent {
    private focusState : boolean = false;

    constructor() {
    }

    setFocusState(state : boolean) {
        this.focusState = state;
    }
}
