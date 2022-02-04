import { useState, useEffect } from "react";

// This is a redux action implemented by the kepler team
import { addDataToMap } from "kepler.gl/actions";

// Dispatching is used to send redux actions to update the state in the store from anywhere in the app... This means it'll be easier to extract to separate components when the app grows. For now, it's not essential to move outside of the App component because this is a small demo.
import { useDispatch } from "react-redux";

// This is a custom react hook that allows us to fetch data. swr stands for stale-while-revalidate. It simplifies the logic of fetching data in a react app! Created by the team behind Next.js
import useSwr from "swr";

import {make_fetch_arc_gis_url, default_function_params} from './utilities/get_data_from_arc_gis';
import {config} from './utilities/map_config';

// This utility function is used to parse the data from the API into the format that kepler.gl expects. That is from GeoJSON to object like: {fields : [], rows: []}
import { processGeojson } from "kepler.gl/processors";

// This is used to create a custom kepler.gl component. This component will be responsible for adding data search functionality to query the ArcGIS API.
// import {injectComponents, PanelHeaderFactory} from 'kepler.gl/components';
import Header from "./components/header";
import KeplerGl from "kepler.gl";
// import CustomPanelHeaderFactory from './components/test_header';

// Found a great tutorial on how to use kepler.gl here:
// https://codesandbox.io/s/bv0vb?file=/src/App.tsx

// resize component as window resizes
// found here: https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
// It's not too bad, just listens for the window to resize and then sets the state to the new width!

// Styling the points in the data



const Map = () => {
  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  function useCurrentWidth() {
    // save current window width in the state object
    let [width, setWidth] = useState(getWidth());

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
      const resizeListener = () => {
        // change width from the state object
        setWidth(getWidth());
      };
      // set resize listener
      window.addEventListener("resize", resizeListener);

      // clean up function
      return () => {
        // remove resize listener
        window.removeEventListener("resize", resizeListener);
      };
    }, []);

    return width;
  }

  let width = useCurrentWidth();

  // We will load the query data here temporarily!
  const dispatch = useDispatch();
  const { data } = useSwr("weather", async () => {
    const { outFields, weather, state, year } = default_function_params;
    const url = make_fetch_arc_gis_url(state, weather, year, outFields);

    const response = await fetch(
      url,
    );
    const data = await response.json();

    // Took a while to figure out that the data needed to be in a certain format here... Going to check if kepler.gl has typescript support yet
    let processed = processGeojson(data);
    console.log(processed);
    return processed;
  });

  useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "weather",
              id: "weather",
            },
            data,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config,
        })
      );
    }
  }, [dispatch, data]);



  return (
    <KeplerGl
      id="weather"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      width={width}
      height={window.innerHeight}
    />
  );
};

function App() {
  return (
    <div>
      <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
      <Header />
      <Map />
    </div>
  );
}

export default App;
