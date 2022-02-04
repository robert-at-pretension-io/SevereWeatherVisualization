
// This utility function is used to parse the data from the API into the format that kepler.gl expects. That is from GeoJSON to object like: {fields : [], rows: []}
import { processGeojson } from "kepler.gl/processors";

import {WeatherTypes, UsaState, outFieldOptions} from '../models/arcgis_query_types';

const base_url = 'https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/NOAA_Storm_Events_Database_view/FeatureServer/0/query?'

export const default_function_params = {
    outFields: [outFieldOptions.DAMAGE_PROPERTY, outFieldOptions.EVENT_TYPE, outFieldOptions.EPISODE_NARRATIVE],
    weather: WeatherTypes.HeavyRain,
    state: UsaState.NorthCarolina,
    year: 2020
}

export function make_fetch_arc_gis_url(state : UsaState, weather : WeatherTypes, year : number, outFields : outFieldOptions[]) : string {

    let joined_outFields = outFields.join(',');

    // Good god... There must be another way... :'( If I had more time I would have looked at the API docs and figured out how to do this more elegantly. I'm sure there's a library out there somewhere... Uriencode doesn't work... 
let query = `YEAR = ${year} ${weather ? "AND EVENT_TYPE ='" + weather +"'": ""} ${state ? " AND STATE = '" + state +"'": ""}`.replace(/\s/g, '+').replaceAll('=', '%3D');
// query = query.replaceAll('=', '%3D');

console.log(query);

// let encoded_query = encodeURI(query);
return `${base_url}where=${query}&outFields=${joined_outFields ? joined_outFields : "*"}&f=pgeojson`;
}



export async function get_data_from_arc_gis(state : UsaState, weather : WeatherTypes, year : number, outFields : outFieldOptions[]) : Promise<any>  {
    
    let url = make_fetch_arc_gis_url(state, weather, year, outFields);
    console.log("url", url);
    const response = await fetch(
        url
      );
      const data = await response.json();
  
      // Took a while to figure out that the data needed to be in a certain format here... Going to check if kepler.gl has typescript support yet
      return processGeojson(data);
}