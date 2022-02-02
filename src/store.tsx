import { configureStore } from "@reduxjs/toolkit";
import keplerGlReducer from 'kepler.gl/reducers';
// import {enhanceReduxMiddleware} from 'kepler.gl/middleware';
import { taskMiddleware } from "react-palm/tasks";

// Found good documentation for setting up keplerGlReducer here:
// https://oddblogger.com/integrating-kepler-gl-in-react-js

// This makes it so the side panels aren't open when you reload the page.
const modifiedKeplerGlReducer = keplerGlReducer.initialState({
    uiState: {
        activeSidePanel: null,
        currentModal: null
    }
});

export default configureStore({
    reducer: {
        keplerGl: modifiedKeplerGlReducer
    },
    middleware: [taskMiddleware]
});