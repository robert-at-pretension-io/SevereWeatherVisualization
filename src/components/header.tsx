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

// Make the loading of data aparent to the user!
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';
import ReactLoading from "react-loading";
// import { FormGroup } from "@material-ui/core";
import { FormGroup, Label, Input, Form, FormInput } from '../styles/form_styles';



type FormValues = {
  state: UsaState;
  weather_type: WeatherTypes;
  out_fields: outFieldOptions[];
  year: number;
};

// Need to get styled components from parent

const Header = () => {
  const dispatch = useDispatch();
  const {promiseInProgress} = usePromiseTracker();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);

    const { state, weather_type, out_fields, year } = formData;

    let data = await trackPromise(
    get_data_from_arc_gis(
      state,
      weather_type,
      year,
      out_fields
    )
    )

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
    (promiseInProgress === true) ? (
      <div>
          <ReactLoading type={"bars"} color={"#444"} height={'200px'} width={'100%'}  />
      </div>
    ) : (

    <Form onSubmit={handleSubmit(onSubmit)}>

        <FormGroup>

          <Label>State:</Label>
          <FormInput
        {...register("state", {
          required: true,
          
          validate: (value) => {
            return Object.values(UsaState).includes(value) || false;
          },
        })}
        defaultValue={state}
      />
        </FormGroup>

        <FormGroup>
          <Label>Weather Type:</Label>
      <select {...register("weather_type")} defaultValue={weather}>
        <option value="">Select Weather Type</option>
        {Object.values(WeatherTypes).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
        </FormGroup>

        <FormGroup>
          <Label>Output Fields:</Label>
      <select {...register("out_fields")} multiple>
        <option value="">Select Fields</option>
        {Object.keys(outFieldOptions).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      </FormGroup>

      <FormGroup>
        <Label>Year:</Label>
      <FormInput
        {...register("year", {
          required: true,
          max: 2020,
          min: 1950,
        })}
        defaultValue={year}
      />
      </FormGroup>
      <Input type="submit" />
    </Form>

    
    )
  );
};

export default Header;
