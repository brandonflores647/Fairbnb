import ReviewForm from "./ReviewForm";
import { useSelector } from 'react-redux';

const ReviewContainer = ({ reviews }) => {
    const sessionUser = useSelector((state) => state.session.user);

    let userId;
    if (sessionUser) userId = sessionUser.id;

    return (
        <>
            <p>Reviews</p>

            {sessionUser && (!reviews[userId]) ? <ReviewForm /> : null}

            {sessionUser && reviews[userId] ?
            <div>
                <p>{`${sessionUser.username}'s Review:`}</p>
                <p>{reviews[userId].rating}</p>
                <p>{reviews[userId].description}</p>
                {userId === reviews[userId].userId ?
                    <button>Delete</button> : null}
            </div> : null}

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
