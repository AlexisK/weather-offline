import {Component, ViewEncapsulation} from '@angular/core';
import {StateService} from './general/state.service';

/*
 APP
 */

@Component({
    selector      : 'my-app',
    templateUrl   : 'app/app.component.html',
    directives    : [],
    providers     : [StateService],
    styleUrls     : ['app/general/general.css', 'app/app.component.css'],
    encapsulation : ViewEncapsulation.None
})

export class AppComponent {

    constructor(private state: StateService) {
        if ('serviceWorker' in navigator) {

            navigator['serviceWorker'].register('./service-worker.js').then(() => {
                console.log('Service Worker Registered');
                state.isLoaded = true;
            });

        }
    }

}
