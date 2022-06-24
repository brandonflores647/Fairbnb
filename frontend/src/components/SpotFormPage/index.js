import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SpotForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(10);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    //   setErrors([]);
    //   return dispatch(sessionActions.signup({ email, username, password }))
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} id='signup-form'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Cost Per Night
        <input
            type="number"
            min="10"
            step='1'
            onChange={(e) => setPrice(e.target.value)}
            required
        />
      </label>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <button type="submit">Post</button>
    </form>
  );
}

export default SignupFormPage;
