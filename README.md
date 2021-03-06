# Angular2 State & Data Demo

Exploring approaches to State and Data management from controllers to @ngrx/store

## What is it?
This is a demonstration project that attempts to explore and illustrate the progression of approaches to data management from the 'Angular 1 Way', 
through changes to http with observables all the way to the current state of the art utilising the flux/redux implementation @ngrx/store.  

Also, While there are some other examples of using flux/redux/@ngrx/store with http, I didn't find any of them to be easy to understand.

## Prerequisites
You will need to have [Git](https://git-scm.com/) and [Node.js + NPM](http://nodejs.org) installed on your machine. 

You will also need to install the `typings` NPM package globally via `npm i -g typings`.

You will also need to install the `angular-cli` NPM package globally via `npm i -g angular-cli`.

You will also need to install the `json-server` NPM package globally via `npm i -g json-server`.


## Make it go
This is a standard angular-cli generated application so you can use all of the ng XXX commands to manage the application.

```
# Download the code
$ git clone https://github.com/JavascriptMick/ng2-state-demo.git
$ cd ng2-state-demo

# Install dependencies
$ npm i

# Install typescript definitions
$ typings install

# Run the backend server
$npm run backend

# Build and serve the app
$ ng serve

# Continuously run the tests
$ ng test

```

Then navigate to [http://localhost:4200](http://localhost:4200) in your browser.

## Toggling the approaches
This repo supports many different approaches in the one project. Using the various approaches requires some commenting out of stuff..
* app.component.html - hide one or other of the app-x-notes tags
* notes.component.ts - use whichever service implementation you want in the constructor, comment out the un-used imports for efficiency.
* main.ts - comment out the runEffects call if you want to explore the non @ngrx/effects approaches

## My Recommendation
After stepping through all of these approaches, using the @ngrx/store + @ngrx/effects is an awesome combination.  It cleanly seperates state management and async orchestration and removes the need for dirty flags and the like.  I will be using this approach for non-toy apps where possible.

## Service & Component Summary
* NotesDataService - This is a thin wrapper around the http functions.
* NotesControllerComponent - Angular 1.0 style implentation using the DataService and local state management directly in the component mirroring an Angular1 controller.
* NotesService - This is a service interface that the component will interact with. The following services implement this interface in various ways taking various approaches.  You can probably skip this abstraction in a real project using only one approach.
* NotesComponent + NotesServiceHttpOnly - This is not a reccomended aproach but illustrates the start of the approach of taking the data service and state management out of the component into a dedicated service.
* NotesComponent + NotesServiceServerFirstOnAdd - A practical and robust implementation utilising store + DataService.  Usable in most 'real world' appliations where the server is the source of uniqueness.
* NotesComponent + NotesServiceStoreFirstOnAdd - A practical and robust implementation using client generated uuid's
* NotesComponent + @ngrx/effects + NotesEffectsService + NotesServiceStoreOnly - An elegant implementation that uses @ngrx/effects.  NotesEffectsService is the service with the effects coded on it and does all of the orchestration of async backend calls with the NotesDataService.  NotesServiceStoreOnly is a clean store-only service implementation.

## Adding Items
I did a lot of thinking about the best way to Add items and tried a lot of approaches.
Note that I avoided bringing in libraries like @ngrx/effects because I wanted to get the logic straight in my head first.

### Server First (Server generates unique Id)
This approach works well when the server is the source of the unique id.

Note that this approach Mirrors the redux-thunk approach where the add action would be delayed in the action creator untill the async response returns.

Logically, it goes like this
1. Send a Post request to the server with the details of the new item
2. When the Post returns, dispatch an 'ADD' action to the store which contains the new item from the server in the payload (with the server id)
3. The reducer in response to 'ADD' action adds the server item to the list.

Pros
* Simplest approach
* Reducer isn't poluted with server related actions
* Model isn't polluted with metadata attributes like 'dirty'
* Appropriate Affordance - It is impossible to attempt to change (or make it appear as if change is possible) untill the item has it's unique ID from the server so there are no race conditions around editing a newly added item.

Cons
* Responsiveness on Add is constrained by server responsiveness - The item doesn't appear on the UI untill the server returns.
* The initial state of the item is determined outside the store so you can't apply any 'creation logic' in the store untill after the item is created on the server.

### Store First then Sync (Client generates id)
This approach only works if 
* The Client can generate the id
* The server will honour the uniqueness and indexability of that Id.
* The server can decide on insert/update of the item based on the pre-existence of that item (i.e. Put/Post is irrelevant) 
Usually this means you will need full control over server and client.

1. Dispatch an add event to the store, the item is created with {dirty:true, id:"970c86.."}
Note here that I can't just Post the new note to the server because the store does not return me a reference to the item that was created as a part of this action. Instead, I need to now ...
2. Invoke a 'sync' function that
* spins through items and if dirty:-
* Posts the item to the server (Note, server must accept Post for existing items)
* when the Post returns from the server, dispatch an 'UPDATE_FROM_SERVER' event which contains the new item from the server in the payload (with any server-mutated properties like audit timestamps)
* the reducer in response to 'UPDATE_FROM_SERVER' swaps out the item with the server item based on the id.
* updates to immediately added items are allowed.

## Updating Items
There is only one sensible approach here.  To allow different sorts of actions that might result in different types of state changes
it only makes sense to drive these changes through the reducer and then 'sync' the changes to the server

### Store First then Sync
1. Dispatch ay type of 'updating' actionto the store, the reducer will change one or many items but must set the 'dirty' flag on any items that have change in respect of state that you want to persist to the server {dirty:true}
2. Invoke a 'sync' function that
* spins through items and if dirty:-
* Puts the item to the server
* when the Put returns from the server, dispatch an 'UPDATE_FROM_SERVER' event which contains the new item from the server in the payload
* the reducer in response to 'UPDATE_FROM_SERVER' swaps out the item with the server item based on the id

#### A note on object equality
You will notice that in the reducer, object equality is not used when handling the update from server (PATCH action) but rather am checking the equality of the id.
This is done deliberately so as not to introduce a race condition.
You may not have considered this but any change to the note between sending the http Post/Put and invoking the PATCH action will result in a new 
object so an object equality check will always fail and effectively and 'orphan' the data returning from the server.

#### A note on dirty and server based actions
You will also notice that the reducer is concerned with the dirty flag and server based actions.
This might seem like a cross concern for the reducer but the presence of a backend and the dirtiness of the data is intrinsic to the data model for the client
and it should be indicated to the user to make it clear when the changes they are making have been persisted permanently.

## @ngrx/effects
This approach completes the progression by leveraging an effects service.

Pros
* Cleanly seperates state mutation from async orchestration
* No need for a dirty flag for serverId implementations because the payload contains the new or updated item instance (you don't need dirty flag to find it)
* No need to access the store contents synchronously, everything is handled as a stream.

Cons
* More moving parts (effects service, effects in the bootstrap, an extra library).

