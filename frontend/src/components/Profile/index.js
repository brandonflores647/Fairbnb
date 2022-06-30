import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';
import ProfileReviewContainer from './ProfileReviewContainer';
import ProfileBookingContainer from './ProfileBookingContainer';

import './Profile.css';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sesh = useSelector(state => state.session);

    useEffect(() => {
        if (!sesh.user) return history.push('/');
        if (!sesh.user.id) return history.push('/');
        if (sesh.user.id !== parseInt(userId, 10)) return history.push('/');
        dispatch(getUserDetail(userId));
    }, [dispatch, history, sesh.user, userId]);

    return (
        <>
            {sesh.user ?
            <>
                <h2>{sesh.user.username}</h2>
                <div className='profile-container'>
                    <ProfileReviewContainer reviews={sesh.user.reviews} />
                    <ProfileBookingContainer bookings={sesh.user.bookings} />
                </div>
            </>
                : null
            }
        </>
    );
}

export default Profile;
