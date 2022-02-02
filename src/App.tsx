import React from "react";

import KeplerGl from "kepler.gl";

// This is a redux action 
import { addDataToMap } from "kepler.gl/actions";

// Dispatching is used to send redux actions to update the state in the store from anywhere in the app... This means it'll be easier to extract to separate components when the app grows. For now, it's not essential to move outside of the App component because this is a small demo.
import { useDispatch } from "react-redux";

// This is a react hook that allows us to fetch data. swr stands for stale-while-revalidate. Drastically simplifies the logic of fetching data in a react app! Created by the team behind Next.js
import useSwr from "swr";

// This utility function is used to parse the data from the API into the format that kepler.gl expects. That is from GeoJSON to object like: {fields : [], rows: []}
import {processGeojson} from 'kepler.gl/processors';


// Found a great tutorial on how to use kepler.gl here:
// https://codesandbox.io/s/bv0vb?file=/src/App.tsx

const Map = () => {
  // We will load the query data here temporarily!
  const dispatch = useDispatch();
  const { data } = useSwr("weather", async () => {
    const response = await fetch(
      "https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/NOAA_Storm_Events_Database_view/FeatureServer/0/query?where=YEAR+%3D+2021+AND+STATE+%3D+%27North+Carolina%27&outFields=*&f=pgeojson"
    );
    const data = await response.json();
      
    // Took a while to figure out that the data needed to be in a certain format here... Going to check if kepler.gl has typescript support yet
    return processGeojson(data);
  });

  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "weather",
              id: "weather"
            },
            data
          },
          option: {
            centerMap: true,
            readOnly: false
          },
          // config: {
          //   visState: {
          //     layers: [
          //       {
          //         id: "weather",
          //         config: {
          //           dataId: "weather",

          //           visConfig: {
          //             radius: 50,
          //           }
          //         }
          //       }
          //     ]
              
          // }
          // }
        })
      );
    }
  }, [dispatch, data]);
  return (
    <KeplerGl
      id="weather"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

function App() {
  return <Map />;
}

export default App;
