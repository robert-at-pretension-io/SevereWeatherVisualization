// ReactJS header component containers an input field that requires a url. When the user clicks the submit button on the headers a redux action is sent
import { addDataToMap } from "kepler.gl/actions";

// Dispatching is used to send redux actions to update the state in the store from anywhere in the app... This means it'll be easier to extract to separate components when the app grows. For now, it's not essential to move outside of the App component because this is a small demo.

import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { Controller } from "react-hook-form";

import { UsaState, WeatherTypes, outFieldOptions } from "../models/arcgis_query_types";

import {
  get_data_from_arc_gis,
  default_function_params,
} from "../utilities/get_data_from_arc_gis";
import { config } from "../utilities/map_config";

// import {DispatchDataToMap} from '../utilities/dispatch_data_to_map';

type FormValues = {
  state: UsaState;
  weather_type: WeatherTypes;
  out_fields: outFieldOptions[];
  year: number;
};

// Need to get styled components from parent

const Header = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);

    const { state, weather_type, out_fields, year } = formData;

    let data = await get_data_from_arc_gis(
      state,
      weather_type,
      year,
      out_fields
    );

    console.log(data);

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
  };

  const { state, weather, year } = default_function_params;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("state", {
          required: true,

          validate: (value) => {
            return Object.values(UsaState).includes(value) || false;
          },
        })}
        defaultValue={state}
      />
      <select {...register("weather_type")} defaultValue={weather}>
        <option value="">Select Weather Type</option>
        {Object.values(WeatherTypes).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <select {...register("out_fields")} multiple>
        <option value="">Select Fields</option>
        {Object.keys(outFieldOptions).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <input
        {...register("year", {
          required: true,
          max: 2020,
          min: 1950,
        })}
        defaultValue={year}
      />
      <input type="submit" />
    </form>
  );
};

export default Header;
