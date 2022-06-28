import ReviewForm from "./ReviewForm";
import EditReviewForm from "./EditReviewForm";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/review'

const ReviewContainer = ({ reviews }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    let userId;
    if (sessionUser) userId = sessionUser.id;

    let review;
    review = useSelector((state) => state.spot.reviews[userId]);

    const [delMessage, setDelMessage] = useState('Delete');
    const [editForm, setEditForm] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (delMessage === 'Delete') {
            setDelMessage('Are you sure?');
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, "2000")
        } else {
            await dispatch(deleteReviewThunk({review}));
        }
    }

    return (
        <>
            <p>Reviews</p>

            {sessionUser &&
                (!reviews[userId] || reviews[userId] && !reviews[userId].id)
                ? <ReviewForm
                    setDelMessage={setDelMessage}
                    setEditForm={setEditForm}/> : null}

            {sessionUser && reviews[userId] && reviews[userId].id ?
                <div>
                    <p>{`${sessionUser.username}'s Review:`}</p>
                    {editForm ?
                        <EditReviewForm />
                        :
                        <>
                            <p>{reviews[userId].rating}</p>
                            <p>{reviews[userId].description}</p>
                        </>
                    }
                    {userId === reviews[userId].userId ?
                        <button onClick={handleDelete}>{delMessage}</button> : null}
                    {userId === reviews[userId].userId ?
                        <button onClick={() => setEditForm(!editForm)}>{editForm ? 'Cancel' : 'Edit'}</button> : null}
                </div> : null }

            {Object.values(reviews).map((review, i) => {
                if (review.userId !== userId) {
                    return (
                        <div key={i}>
                            <p>{review.rating}</p>
                            <p>{review.description}</p>
                        </div>
                    );
                }
            })}
        </>
    );
}

export default ReviewContainer;
