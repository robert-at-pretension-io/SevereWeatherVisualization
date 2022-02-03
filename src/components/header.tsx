// ReactJS header component containers an input field that requires a url. When the user clicks the submit button on the headers a redux action is sent

import React from 'react';
import { useDispatch } from 'react-redux';

// import './header.styles.scss';

const Header = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    
    dispatch({ type: 'SUBMIT_URL', "form submitted": "data" });
  };

  return (
    <div className="header">
      <h1>ArcGIS Storm Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" placeholder="Enter endpoint url" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Header;