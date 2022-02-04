// used for kepler.gl config when using AddDataToMap action

export let config = {
    version: "v1",
    config: {
      visState: {
        filters: [],
        layers: [
          {
            // id: "o3uc96",
            type: "geojson",
            config: {
              dataId: "weather",
              label: "weather",
  
              columns: { geojson: "_geojson" },
              isVisible: true,
              visConfig: {
                opacity: 0.8,
                strokeOpacity: 0.8,
                thickness: 0.5,
                strokeColor: null,
                radius: 30,
                sizeRange: [0, 10],
                radiusRange: [0, 50],
                heightRange: [0, 500],
                elevationScale: 5,
                enableElevationZoomFactor: true,
                stroked: false,
                filled: true,
                enable3d: false,
                wireframe: false,
              },
            },
          },
        ],
      },
    },
  };