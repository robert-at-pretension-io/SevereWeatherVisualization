Anytime code is pushed to this repository, the code will be deployed automatically to: https://stupefied-meninsky-03385d.netlify.app/ (the url is automatically generated 😅).

# Game Plan:
* Add Redux: ✅
* Add Kepler.gl (mapbox): ✅
* Model ArcGIS query using typescript
* Visualize data using Kepler.gl
* Write tests
* Write retrospective

# Notes on the project:
## Redux
* *Redux is a library that allows us to manage global state in our React application.* It uses the concepts of stores, reducers, actions, and dispatching to manage state. By keeping the state immutable (read-only), it is easier to debug the code later on by sending detailed error messages to the server -- the developer debugging the code can step through the state the user had that lead to the error.
* **Project Usage:** We will use React-Redux with a model of the data we get from the ArcGIS API. In order to easily debug the code, we will define the model using typescript.

## Kepler.gl
* *Kepler.gl is a library that allows us to visualize geo-data in a map.* It uses the concepts of layers, sources, and mapbox-gl to visualize data. It is a react component that works with Redux!
* **Project Usage**: 
* The library requires key to use mapbox api. Since this is a demo, we will just bake the api key in 😢. In production, we would implement authentication/authorization and access a backend api to get access token.
* The kepler.gl version used doesn't have types unfortunately. It looks like this will change in the future, as of dec 31, 2022 typescript types are being added on the official kepler.gl repo.

## Modeling ArcGIS query
* *The ArcGIS API is a RESTful API that allows us to query data from a geospatial database.*
* **Project Usage:** We request 
