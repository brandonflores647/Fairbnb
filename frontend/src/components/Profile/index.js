import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';
import ProfileReviewContainer from './ProfileReviewContainer';
import ProfileBookingContainer from './ProfileBookingContainer';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sesh = useSelector(state => state.session);

    useEffect(() => {
        const handleDispatch = () => {
            if (!sesh.user) return history.push('/');
            if (!sesh.user.id) return history.push('/');
            if (sesh.user.id !== parseInt(userId, 10)) return history.push('/');
            dispatch(getUserDetail(userId));
        }
        handleDispatch();
    }, [dispatch, history, sesh.user, userId]);

    return (
        <>
            {sesh.user ?
                <div>
                    <p>{sesh.user.username}</p>
                    <ProfileReviewContainer reviews={sesh.user.reviews} />
                    <ProfileBookingContainer bookings={sesh.user.bookings} />
                </div>
                : null
            }
        </>
    );
}

export default Profile;
