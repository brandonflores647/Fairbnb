import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReviewThunk } from '../../store/review'

const EditReviewForm = ({ setDelMessage, setEditForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    let userId;
    if (sessionUser) userId = sessionUser.id;
    let review;
    review = useSelector((state) => state.spot.reviews[userId]);

    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState(review.description);
    const [rating, setRating] = useState(review.rating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setDelMessage('Delete');
        const reviewStatus = await dispatch(editReviewThunk({reviewId: review.id, description, rating}))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if (reviewStatus) setEditForm(false);
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
                <button type='submit'>Submit Edit</button>
            </form>
        </>
    );
}

export default EditReviewForm;
