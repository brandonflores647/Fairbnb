import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { create } from "../../store/spot";
import { csrfFetch } from '../../store/csrf';

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

    const [imgOne, setImgOne] = useState("");
    const [imgTwo, setImgTwo] = useState("");
    const [imgThree, setImgThree] = useState("");
    const [imgFour, setImgFour] = useState("");

    const [images, setImages] = useState([imgOne, imgTwo, imgThree, imgFour]);
    const [errors, setErrors] = useState([]);
    const [submitState, setSubmitState] = useState(false);

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
      setSubmitState(true);
      e.preventDefault();
      setErrors([]);

      const imgs = [];
      images.forEach(async (file) => {
        const { url } = await csrfFetch("/s3Url").then(res => res.json());

        await csrfFetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: file
        })

        const imageUrl = url.split('?')[0];
        imgs.push(imageUrl);
        console.log(imgs)
      });

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


    return (
      <form onSubmit={handleSubmit} id='spot-edit-form'>
        <div className='error-container'>
          {errors.length ? <p className='error-message'>The following errors occured:</p> : null}
          <ul>
            {errors.map((error, idx) => <li className='form-error' key={idx}>{error}</li>)}
          </ul>
        </div>
        <label className='edit-form-label'>
          Name
          <input
            className='edit-form-input'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
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
        <label className='edit-form-label'>
          Address
          <input
            className='edit-form-input'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          City
          <input
            className='edit-form-input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          State
          <input
            className='edit-form-input'
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          Country
          <input
            className='edit-form-input'
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label className='edit-form-label'>
          Upload Images
          <div id='edit-spot-images'>
            <label className='edit-form-label'>
              First Image: *
              <input
                id='imgOneInput'
                type="file"
                onChange={() => setImgOne(document.querySelector('#imgOneInput').files[0])}
                accept=".png, .jpg, .jpeg"
                required
              />
            </label>
            <label className='edit-form-label'>
              Second Image:
              <input
                id='imgTwoInput'
                type="file"
                onChange={() => setImgTwo(document.querySelector('#imgTwoInput').files[0])}
                accept=".png, .jpg, .jpeg"
              />
            </label>
            <label className='edit-form-label'>
              Third Image:
              <input
                id='imgThreeInput'
                type="file"
                onChange={() => setImgThree(document.querySelector('#imgThreeInput').files[0])}
                accept=".png, .jpg, .jpeg"
              />
            </label>
            <label className='edit-form-label'>
              Fourth Image:
              <input
                id='imgFourInput'
                type="file"
                onChange={() => setImgFour(document.querySelector('#imgFourInput').files[0])}
                accept=".png, .jpg, .jpeg"
              />
            </label>
          </div>
        </label>
        <div id='spot-post-buttons'>
          <button
            className='edit-post-button'
            id='post-spot-button'
            type="submit"
            onClick={() => setImages([imgOne, imgTwo, imgThree, imgFour])}
            disabled={submitState}
            >Post</button>
        </div>
      </form>
    );
}

export default SpotFormPage;
