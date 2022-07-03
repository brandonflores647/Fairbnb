import { useState, useEffect } from 'react';
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

    const [star, setStar] = useState(1);

    const [starTwo, setStarTwo] = useState('regular');
    const [starThree, setStarThree] = useState('regular');
    const [starFour, setStarFour] = useState('regular');
    const [starFive, setStarFive] = useState('regular');

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

    useEffect(() => {
        switch (star) {
            case 1:
                setStarTwo('regular');
                setStarThree('regular');
                setStarFour('regular');
                setStarFive('regular');
                break;
            case 2:
                setStarTwo('solid');
                setStarThree('regular');
                setStarFour('regular');
                setStarFive('regular');
                break;
            case 3:
                setStarTwo('solid');
                setStarThree('solid');
                setStarFour('regular');
                setStarFive('regular');
                break;
            case 4:
                setStarTwo('solid');
                setStarThree('solid');
                setStarFour('solid');
                setStarFive('regular');
                break;
            case 5:
                setStarTwo('solid');
                setStarThree('solid');
                setStarFour('solid');
                setStarFive('solid');
                break;
            default:
              break;
          }
    }, [star]);

    return (
        <>
            {errors.length > 0 ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}
            <form id='new-review-form' onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <div className='star-container' onMouseLeave={() => setStar(rating)}>
                        <i
                        className={`fa-solid fa-star fa-xl rating-star`}
                        onMouseEnter={() => setStar(1)}
                        onClick={() => setRating(1)}></i>
                        <i
                        className={`fa-${starTwo} fa-star fa-xl rating-star`}
                        onMouseEnter={() => setStar(2)}
                        onClick={() => setRating(2)}></i>
                        <i
                        className={`fa-${starThree} fa-star fa-xl rating-star`}
                        onMouseEnter={() => setStar(3)}
                        onClick={() => setRating(3)}></i>
                        <i
                        className={`fa-${starFour} fa-star fa-xl rating-star`}
                        onMouseEnter={() => setStar(4)}
                        onClick={() => setRating(4)}></i>
                        <i
                        className={`fa-${starFive} fa-star fa-xl rating-star`}
                        onMouseEnter={() => setStar(5)}
                        onClick={() => setRating(5)}></i>
                    </div>
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows='10'
                />

                <button className='edit-post-button' id='new-review-submit-button' type='submit'>Submit Review</button>
            </form>
        </>
    );
}

export default ReviewForm;
