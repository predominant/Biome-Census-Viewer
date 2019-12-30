# Biome-Census-Viewer
Biome (or Habitat(tm)) Census Viewer

## Design

* Built with ReactJS
* `fetch`s census data from the Biome supervisor
* Uses a proxy to enable CORS bypass
* Single Page application
* Allow multiple endpoints, local storage

Possibly:

* Wrap as an electron app

## TODO

* `currentServer` is a separate object. This should be changed to be an index in the `servers` list/array.
* Change the status value to be stored in the `servers` list.
* Use status to update sidebar indicator based on latest poll status.

