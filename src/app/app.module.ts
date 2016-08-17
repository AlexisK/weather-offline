import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent}  from './app.component';
import {routing, appRoutingProviders} from './app.routing';

import {StateService} from './services/state.service';
import {WeatherService} from './services/weather.service';


@NgModule({
    imports      : [BrowserModule, routing],
    declarations : [AppComponent],
    providers    : [
        HTTP_PROVIDERS,
        appRoutingProviders,
        StateService,
        WeatherService,
        {provide : LocationStrategy, useClass : HashLocationStrategy}
    ],
    bootstrap    : [AppComponent]
})
export class AppModule {
}
