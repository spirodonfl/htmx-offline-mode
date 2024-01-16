# What is this?

Currently HTMX does not support offline mode. Connectivity is required to process (but not execute) htmx actions on any given page where it is implemented.

To achieve offline mode, we are going to implement at least a few different features

* Detect when we're offline
* During offline mode, catch/trap/interject any hx requests going out
* Capture state of request
* - Element source (which element triggered the request)
  - Parameters of request
  - Success / fail operations of request
* Store request (maybe using localStorage OR sqlocal?)
* Wait for connectivity
* On connectivity, ship requests either in queue or async
* Handle results of requests appropriately

## Technologies Required

* Local storage (so localStorage OR sqlocal?)
* HTMX
* WebWorkers (y though?)
* - (link to review)[https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers]

## Where does WASM fit in?

WASM might, potentially, serve as back-end router to ship back offline responses when htmx continues to make requests.

However, this might not be necessary if we have some light front-end driven interactions while offline.

[Work in Progress]

### Dumping Ground

* Possibility to use replicache. Lean on localStorage and then a background (worker?) process deals with CRDTs. Ultimately you'd end up patching the DB...
* Optimistic updates
* To capture htmx requests
* - https://github.com/bigskysoftware/htmx/blob/master/src/htmx.js#L2217
  - Possibly do something like document.addEventListener('htmx:beforeRequest') -> get event data somehow

### TODO

- [x] How do we capture HTMX requests (outgoing)?
- [x] Can we tell if we're online/offline
- [x] How do we convert capture HTMX requests to data we can store?
- [x] Where do we store said data (refer to Dumping Ground for awesome Chris ideas)
- [x] How do we store required success/fail operations when we finally ship the requests?
- [ ] How do we deal with requests interactivity while offline?
- [x] How do we fire off requests from DB once we go back online?
- [x] Add optional "ship to server" parameter - ALREADY DONE WITH "ignore:extension_name" via HTMX
- [ ] Dedupe or ignore duplicate requests
