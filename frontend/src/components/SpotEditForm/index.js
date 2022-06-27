import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from "../../store/spot";
import SpotDeleteForm from '../SpotDeleteForm';

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
    const [imgOne, setImgOne] = useState(imgArr[0].url);
    const [imgTwo, setImgTwo] = useState(imgArr[1] ? imgArr[1].url : '');
    const [imgThree, setImgThree] = useState(imgArr[2] ? imgArr[2].url : '');
    const [imgFour, setImgFour] = useState(imgArr[3] ? imgArr[3].url : '');
    const [images, setImages] = useState([imgOne, imgTwo, imgThree, imgFour]);
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

    return (
        <>
        <form onSubmit={handleSubmit} id='signup-form'>
            {errors.length > 0 ?
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> : null}

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

        {sessionUser && sessionUser.id === spot.data.userId ?
                <button onClick={() => setDeleteBtn(!deleteBtn)}
                    >{deleteBtn ? 'Cancel' : 'Delete'}</button> : null}
        {deleteBtn ?
                <SpotDeleteForm />
            :
                null
            }
        </>
    );
}

export default SpotEditForm;
