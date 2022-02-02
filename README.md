Anytime code is pushed to this repository, the code will be deployed automatically to: https://stupefied-meninsky-03385d.netlify.app/ (the url is automatically generated 😅).

# Game Plan:
* Add Redux
* Add Kepler.gl
* Model ArcGIS query using typescript
* Visualize data using Kepler.gl
* Write tests

# Notes on the project:
## Redux
* *Redux is a library that allows us to manage global state in our React application.* It uses the concepts of stores, reducers, actions, and dispatching to manage state. By keeping the state immutable (read-only), it is easier to debug the code later on by sending detailed error messages to the server -- the developer debugging the code can step through the state the user had that lead to the error.
* We will use React-Redux with a model of the data we get from the ArcGIS API. In order to easily debug the code, we will define the model using typescript.