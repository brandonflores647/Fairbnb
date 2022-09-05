import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { create } from "../../store/spot";
import FileUpload from "./FileUpload";

import './SpotForm.css';

function SpotFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let userId;
    if (sessionUser) userId = sessionUser.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(10);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [submitState, setSubmitState] = useState(false);

    const [btnGradient, setBtnGradient] = useState(false);

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
      setSubmitState(true);
      e.preventDefault();
      setErrors([]);

      let dispatchData;
      dispatchData = await dispatch(create({ userId, name, price, address, city, state, country, images }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        setSubmitState(false);
      })
      .then(res => {
        if (res) history.push(`/spots/${res.spot.id}`)
      })
      return dispatchData;
    };

    const updateFiles = (e) => {
      const files = e.target.files;
      setImages(files);
    };

    return (
      <form onSubmit={handleSubmit} id='spot-edit-form'>
        <span id='spot-form-title'>Create a spot <div id='title-gradient'></div></span>
        <div className='error-container'>
          <ul>
            {errors.map((error, idx) => <li className='form-error' key={idx}>{error}</li>)}
          </ul>
        </div>
        <div className='spot-form-top'>
          <label className='edit-form-label' id='edit-form-name'>
            Name
            <input
              className='edit-form-input'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className='edit-form-label' id='edit-form-cost'>
            Cost Per Night
            <input
              className='edit-form-input'
              type="number"
              min="10"
              max="99999"
              step='1'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='spot-form-middle'>
        <label className='edit-form-label' id='edit-form-address'>
          Address
          <input
            className='edit-form-input'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label' id='edit-form-city'>
          City
          <input
            className='edit-form-input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        </div>
        <div className='spot-form-bottom'>
        <label className='edit-form-label' id='edit-form-state'>
          State
          <input
            className='edit-form-input'
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label' id='edit-form-country'>
          Country
          <input
            className='edit-form-input'
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        </div>
        <FileUpload updateFiles={updateFiles} images={images}/>
        <div id='spot-post-button'>
          <button
            className={btnGradient?'':'post-spot-button-default'}
            id='post-spot-button'
            type="submit"
            disabled={submitState}
            onMouseMove={(e) => {
              const xPos = Math.ceil(
                Math.abs(
                  (e.clientX - e.target.offsetLeft)
                  / e.target.offsetWidth * 100
                )
              );
              const yPos = Math.ceil(
                Math.abs(
                  (e.clientY - e.target.offsetTop)
                  / e.target.offsetHeight * 100
                )
              );
              e.target.style.setProperty('--x', xPos);
              e.target.style.setProperty('--y', yPos);
            }}
            onMouseEnter={() => setBtnGradient(true)}
            onMouseLeave={() => setBtnGradient(false)}
          >Create Spot
          </button>
        </div>
      </form>
    );
}

export default SpotFormPage;
