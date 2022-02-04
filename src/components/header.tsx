// ReactJS header component containers an input field that requires a url. When the user clicks the submit button on the headers a redux action is sent
import { addDataToMap } from "kepler.gl/actions";

// Dispatching is used to send redux actions to update the state in the store from anywhere in the app... This means it'll be easier to extract to separate components when the app grows. For now, it's not essential to move outside of the App component because this is a small demo.

import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import useSwr from "swr";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { Controller } from "react-hook-form";

import { UsaState, WeatherTypes, outFieldOptions } from '../models/query';

import { get_data_from_arc_gis } from '../utilities/get_data_from_arc_gis';


let config = {
  version: "v1",
  config: {
    visState: {
      filters: [],
      layers: [
        {
          type: "geojson",
          config: {
            dataId: "weather",
            label: "weather",

            columns: { geojson: "_geojson" },
            isVisible: true,
            visConfig: {
              radius: 30,
            },
          },
        },
      ],
    },
  },
};



// import {DispatchDataToMap} from '../utilities/dispatch_data_to_map';

type FormValues = {
  state : UsaState,
  weather_type : WeatherTypes,
  out_fields : outFieldOptions[],
  year : number,
};

// Need to get styled components from parent

const Header = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm<FormValues>();

  const useSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);

    const { state, weather_type, out_fields, year } = formData;

    const { data } = useSwr("weather", async () => {
      return await get_data_from_arc_gis(state, weather_type, year,  out_fields);
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
  };



  return (
    <form onSubmit={handleSubmit(useSubmit)}>
      <input {...register("state")} />
      <select {...register("weather_type")}>
        <option value="">Select Weather Type</option>
        {Object.keys(WeatherTypes).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <select {...register("out_fields")}/>
      <input {...register("year")} />
      <input type="submit" />
    </form>
  );
};



export default Header;
