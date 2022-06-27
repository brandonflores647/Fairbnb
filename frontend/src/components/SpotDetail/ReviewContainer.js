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

            {Object.values(reviews).map((review, i) => {
                return (
                    <div key={i}>
                        <p>{review.rating}</p>
                        <p>{review.description}</p>
                    </div>
                );
            })}
        </>
    );
}

export default ReviewContainer;
