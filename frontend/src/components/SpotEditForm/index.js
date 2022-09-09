import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../../store/spot";
import SpotDeleteForm from '../SpotDeleteForm';
import EditFileUpload from "./EditFileUpload";

import './SpotEditForm.css';
import '../SpotFormPage/SpotForm.css';

const SpotEditForm = ({ hideForm }) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector(state => state.spot);

  const imgArr = Object.values(spot.images);

  let userId;
  if (sessionUser) userId = sessionUser.id;

  const id = spot.data.id;

  const [name, setName] = useState(spot.data.name);
  const [price, setPrice] = useState(spot.data.price);
  const [address, setAddress] = useState(spot.data.address);
  const [city, setCity] = useState(spot.data.city);
  const [state, setState] = useState(spot.data.state);
  const [country, setCountry] = useState(spot.data.country);
  const [images, setImages] = useState(imgArr.map(e => e.url));
  const [oldImages] = useState(images);
  const [errors, setErrors] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let data;
    await dispatch(update({ id, userId, name, price, address, city, state, country, images, oldImages }))
    .catch(async (res) => {
      data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    if (!data) hideForm();
  };

  const updateFiles = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id='spot-edit-form'>
        <div className='error-container'>
          {errors.length ? <p className='error-message'>The following errors occured:</p> : null}
          {errors.length > 0 ?
            <ul>
              {errors.map((error, idx) => <li className='form-error' key={idx}>{error}</li>)}
            </ul> : null}
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
      <EditFileUpload updateFiles={updateFiles} images={images}/>
      <div id='edit-form-buttons'>
        <button
          type='button'
          className='edit-post-button'
          onClick={hideForm}
        >Cancel Edit</button>
        <button
          className='edit-post-button'
          type="submit"
        >Post Changes</button>
      {sessionUser && sessionUser.id === spot.data.userId ?
        <button type='button' className='edit-post-button' onClick={() => setDeleteBtn(!deleteBtn)}
        >{deleteBtn ? 'Cancel Delete' : 'Delete'}</button> : null}
      </div>
      </form>
      {deleteBtn ? <SpotDeleteForm /> : null }
    </>
  );
}

export default SpotEditForm;
