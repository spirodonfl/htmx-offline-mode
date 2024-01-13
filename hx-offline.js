htmx.defineExtension('hx-offline', {
    onEvent: function (name, evt) {
        console.log('Fired event', {name, evt});
        if (name === 'htmx:beforeRequest') {
            console.log('Success');
        }
    }
});

window.addEventListener('online', function (evt) {
    console.log('Online');
    console.log(evt);
    console.log(navigator.onLine);
});
window.addEventListener('offline', function (evt) {
    console.log('Offline');
    console.log(evt);
    console.log(navigator.onLine);
});
