import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { create } from "../../store/spot";

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

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);
      let dispatchData;
      dispatchData = await dispatch(create({ userId, name, price, address, city, state, country, images }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      .then(res => {
        if (res) history.push(`/spots/${res.spot.id}`)
      })
      return dispatchData;
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
              value={price}
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
        <label>
          Image Url
          <input
            type="text"
            value={imgOne}
            onChange={(e) => setImgOne(e.target.value)}
            placeholder=' (Required)'
          />
          <input
            type="text"
            value={imgTwo}
            onChange={(e) => setImgTwo(e.target.value)}
            placeholder=' (Optional)'
          />
          <input
            type="text"
            value={imgThree}
            onChange={(e) => setImgThree(e.target.value)}
            placeholder=' (Optional)'
          />
          <input
            type="text"
            value={imgFour}
            onChange={(e) => setImgFour(e.target.value)}
            placeholder=' (Optional)'
          />
        </label>
        <button
          type="submit"
          onClick={() => setImages([imgOne, imgTwo, imgThree, imgFour])}
          >Post</button>
      </form>
    );
}

export default SpotFormPage;
