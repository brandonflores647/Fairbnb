import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../store/spot';

const SpotDeleteForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spot.data);
    const images = useSelector(state => state.spot.images);
    const reviews = useSelector(state => state.spot.reviews);

    const [deleteInput, setDeleteInput] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let data;
        await dispatch(deleteSpotThunk({spot, images, reviews, deleteInput}))
            .catch(async (res) => {
                data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (!data) history.push('/');
    }

    return (
        <>
        <p>Type the name if this spot and press 'Delete' to confirm this action.</p>
        <form onSubmit={handleSubmit}>
            {errors.length > 0 ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}
            <input
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="(Type name here)"
            />
            <button type='submit'>Delete</button>
        </form>
        </>
    );
}

export default SpotDeleteForm;
