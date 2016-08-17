importScripts('/static/polyfills/cache.js');

var cacheName    = 'weather-offline-cache-v1-7';
var filesToCache = [
    '/',
    '/node_modules/core-js/client/shim.min.js',
    '/node_modules/zone.js/dist/zone.js',
    '/node_modules/reflect-metadata/Reflect.js',
    '/node_modules/systemjs/dist/system.src.js',
    '/systemjs.config.js',
    '/app/main.js',
    '/node_modules/@angular/platform-browser-dynamic//bundles/platform-browser-dynamic.umd.js',
    '/app/app.module.js',
    '/node_modules/@angular/core//bundles/core.umd.js',
    '/node_modules/@angular/platform-browser//bundles/platform-browser.umd.js',
    '/node_modules/@angular/common//bundles/common.umd.js',
    '/node_modules/@angular/http//bundles/http.umd.js',
    '/app/app.component.js',
    '/app/app.routing.js',
    '/app/services/state.service.js',
    '/node_modules/@angular/compiler//bundles/compiler.umd.js',
    '/app/layout/loader/loader-screen.component.js',
    '/app/layout/navbar/navbar.component.js',
    '/app/components/ico-prefetch/ico-prefetch.component.js',
    '/app/components/ico/ico.component.js',
    '/node_modules/@angular/router//bundles/router.umd.js',
    '/app/pages/routes.js',
    '/node_modules/rxjs/Observable.js',
    '/node_modules/rxjs/operator/toPromise.js',
    '/node_modules/rxjs/Subject.js',
    '/node_modules/rxjs/observable/PromiseObservable.js',
    '/app/pages/dashboard/dashboard.component.js',
    '/app/pages/weather/weather.component.js',
    '/node_modules/rxjs/add/operator/map.js',
    '/node_modules/rxjs/add/operator/mergeMap.js',
    '/node_modules/rxjs/add/operator/mergeAll.js',
    '/node_modules/rxjs/add/operator/reduce.js',
    '/node_modules/rxjs/add/operator/every.js',
    '/node_modules/rxjs/observable/from.js',
    '/node_modules/rxjs/observable/of.js',
    '/node_modules/rxjs/add/operator/first.js',
    '/node_modules/rxjs/add/operator/catch.js',
    '/node_modules/rxjs/add/operator/concatAll.js',
    '/node_modules/rxjs/util/EmptyError.js',
    '/node_modules/rxjs/observable/fromPromise.js',
    '/node_modules/rxjs/add/operator/last.js',
    '/node_modules/rxjs/BehaviorSubject.js',
    '/node_modules/rxjs/add/operator/toPromise.js',
    '/node_modules/rxjs/observable/forkJoin.js',
    '/node_modules/rxjs/util/root.js',
    '/node_modules/rxjs/symbol/observable.js',
    '/node_modules/rxjs/util/toSubscriber.js',
    '/node_modules/rxjs/Subscriber.js',
    '/node_modules/rxjs/Subscription.js',
    '/node_modules/rxjs/SubjectSubscription.js',
    '/node_modules/rxjs/symbol/rxSubscriber.js',
    '/node_modules/rxjs/util/throwError.js',
    '/node_modules/rxjs/util/ObjectUnsubscribedError.js',
    '/node_modules/rxjs/operator/map.js',
    '/node_modules/rxjs/operator/mergeMap.js',
    '/node_modules/rxjs/operator/mergeAll.js',
    '/node_modules/rxjs/operator/reduce.js',
    '/node_modules/rxjs/operator/every.js',
    '/node_modules/rxjs/observable/FromObservable.js',
    '/node_modules/rxjs/observable/ArrayObservable.js',
    '/node_modules/rxjs/operator/first.js',
    '/node_modules/rxjs/operator/catch.js',
    '/node_modules/rxjs/operator/concatAll.js',
    '/node_modules/rxjs/operator/last.js',
    '/node_modules/rxjs/observable/ForkJoinObservable.js',
    '/node_modules/rxjs/util/isFunction.js',
    '/node_modules/rxjs/Observer.js',
    '/node_modules/rxjs/util/isArray.js',
    '/node_modules/rxjs/util/isObject.js',
    '/node_modules/rxjs/util/tryCatch.js',
    '/node_modules/rxjs/util/errorObject.js',
    '/node_modules/rxjs/util/UnsubscriptionError.js',
    '/node_modules/rxjs/util/subscribeToResult.js',
    '/node_modules/rxjs/OuterSubscriber.js',
    '/node_modules/rxjs/util/isPromise.js',
    '/node_modules/rxjs/util/isScheduler.js',
    '/node_modules/rxjs/observable/IteratorObservable.js',
    '/node_modules/rxjs/observable/ArrayLikeObservable.js',
    '/node_modules/rxjs/symbol/iterator.js',
    '/node_modules/rxjs/operator/observeOn.js',
    '/node_modules/rxjs/observable/ScalarObservable.js',
    '/node_modules/rxjs/observable/EmptyObservable.js',
    '/node_modules/rxjs/InnerSubscriber.js',
    '/node_modules/rxjs/Notification.js',
    '/app/app.component.html',
    '/app/pages/dashboard/dashboard.component.html',
    '/app/pages/weather/weather.component.html',
    '/app/layout/loader/loader-screen.component.html',
    '/app/layout/navbar/navbar.component.html',
    '/app/components/ico/ico.component.html',
    '/app/components/ico-prefetch/ico-prefetch.component.css',
    '/app/general/general.css',
    '/app/app.component.css',
    '/app/pages/dashboard/dashboard.component.css',
    '/app/pages/weather/weather.component.css',
    '/app/layout/loader/loader-screen.component.css',
    '/app/layout/navbar/navbar.component.css',
    '/app/components/ico/ico.component.css ',
    '/app/services/weather.service.js ',
    '/app/components/weather-widget/weather-widget.component.js',
    '/app/components/weather-widget/weather-widget.component.html',
    '/app/components/weather-widget/weather-widget.component.css',
    '/static/icons.html'
];

var pathToCache = [
    'https://query.yahooapis.com'
];

var fetched        = [];
var _fetchInterval = null;

self.addEventListener('install', function (ev) {
    console.log('[ServiceWorker] Install');
    ev.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (ev) {
    console.log('[ServiceWorker] Activate');
    ev.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if ( key !== cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (ev) {

    ev.respondWith(
        caches.match(ev.request).then(function (response) {
            if ( response ) {
                return response;
            }

            pathToCache.forEach(path => {
                if ( ev.request.url.indexOf(path) == 0 ) {
                    caches.open(cacheName).then(function (cache) {
                        console.log(`Caching ${ev.request.url}`);
                        cache.add(ev.request.url);
                    });
                }
            });

            logFetched(ev.request.url);
            return fetch(ev.request);
        })
    );
});

function logFetched(url) {
    fetched.push(url);
    clearInterval(_fetchInterval);
    _fetchInterval = setTimeout(_logFetched, 300);
}

function _logFetched() {
    console.log('[ServiceWorker] Need to fetch:\n', fetched.join('\n'), '\n');
    fetched = [];
}
