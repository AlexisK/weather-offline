// Base
import {Component, ViewEncapsulation} from '@angular/core';

// Services
import {StateService} from './services/state.service';

// Components
import {loaderScreenComponent} from './layout/loader/loader-screen.component';
import {navbarComponent} from './layout/navbar/navbar.component';
import {icoPrefetchComponent} from './components/ico-prefetch/ico-prefetch.component';
import {IcoComponent} from './components/ico/ico.component';

/*
 APP
 */

@Component({
    selector      : 'my-app',
    templateUrl   : 'app/app.component.html',
    directives    : [
        loaderScreenComponent,
        navbarComponent,
        icoPrefetchComponent,
        IcoComponent
    ],
    providers     : [StateService],
    styleUrls     : ['app/general/general.css', 'app/app.component.css'],
    encapsulation : ViewEncapsulation.None
})

export class AppComponent {

    constructor(private state : StateService) {
        if ('serviceWorker' in navigator) {

            navigator['serviceWorker'].register('./service-worker.js').then(() => {
                console.log('Service Worker Registered');
                setTimeout(() => state.isLoaded = true, 200);
            });

        }
    }

}
