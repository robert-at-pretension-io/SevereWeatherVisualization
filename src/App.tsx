// import React from "react";
// import './App.css';
import KeplerGl from "kepler.gl";
// Dispatching is used to send actions to the store from anywhere in the app... This means it'll be easier to extract to separate components when the app grows. For now, it's not essential to move outside of the App component because this is a small demo.
// import { useDispatch } from "react-redux";

// Found a great tutorial on how to use kepler.gl here:
// https://codesandbox.io/s/bv0vb?file=/src/App.tsx

const Map = () => {
  // We will load the query data here temporarily!
  return (
    <KeplerGl
      id="weather-map"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      width={window.innerWidth}
      height={window.innerHeight}
      // props can also be passed in like ...props
    />
  );
};

function App() {
  return <Map />;
}

export default App;
