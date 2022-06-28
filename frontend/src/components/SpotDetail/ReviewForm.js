import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk } from '../../store/review'

const ReviewForm = ({ setDelMessage, setEditForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const spotId = useSelector(state => state.spot.data.id);

    let userId;
    if (sessionUser) userId = sessionUser.id;

    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setDelMessage('Delete');
        setEditForm(false);
        await dispatch(createReviewThunk({userId, spotId, description, rating}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            {errors.length > 0 ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min='1'
                    max='5'
                />
                <button type='submit'>Submit Review</button>
            </form>
        </>
    );
}

export default ReviewForm;
