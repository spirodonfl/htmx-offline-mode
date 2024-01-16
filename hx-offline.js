let QUEUE = localStorage.getItem('htmx-offline-queue');
if (QUEUE === null) {
    QUEUE = [];
    localStorage.setItem('htmx-offline-queue', []);
}

htmx.defineExtension('hx-offline', {
    onEvent: function (name, evt) {
        // console.log('Fired event', {name, evt});
        if (name === 'htmx:beforeRequest') {
            if (!navigator.onLine) {
                QUEUE.push({trigger: generateTriggerSpecs(evt.srcElement), element: evt.srcElement});
                localStorage.setItem('htmx-offline-queue', QUEUE);
            }
        }
    }
});

function matches(elt, selector) {
    let matchesFunction = elt.matches || elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector || elt.webkitMatchesSelector || elt.oMatchesSelector;
    return matchesFunction && matchesFunction.call(elt, selector);
}

let INPUT_SELECTOR = 'input, textarea, select';
function generateTriggerSpecs(elt) {
    let explicit_trigger = elt.getAttribute('hx-trigger');
    if (explicit_trigger) {
        return explicit_trigger;
    }

    let trigger_specs = [];
    if (trigger_specs.length > 0) {
        return trigger_specs;
    } else if (matches(elt, 'form')) {
        return 'submit';
    } else if (matches(elt, 'input[type="button"], input[type="submit"]')){
        return 'click';
    } else if (matches(elt, INPUT_SELECTOR)) {
        return 'change';
    } else {
        return 'click';
    }
}

window.addEventListener('online', function (evt) {
    console.log('Online');
    console.log(evt);
    console.log(navigator.onLine);

    if (navigator.onLine) {
        // Release the Kraken
        for (let i = 0; i < QUEUE.length; ++i) {
            // execute QUEUE[i].trigger via QUEUE[i].elt
            // htmx.trigger(trigger, elt, return)
            htmx.trigger(QUEUE[i].element, QUEUE[i].trigger, function (e) {
                console.log('QUEUE TRIGGER', e);
            });
        }
        QUEUE = [];
        localStorage.setItem('htmx-offline-queue', []);
    }
});
window.addEventListener('offline', function (evt) {
    console.log('Offline');
    console.log(evt);
    console.log(navigator.onLine);
});
