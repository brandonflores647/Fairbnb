import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';
import ProfileReviewContainer from './ProfileReviewContainer';
import ProfileBookingContainer from './ProfileBookingContainer';
import SpotCard from '../SpotsContainer/SpotCard';

import './Profile.css';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sesh = useSelector(state => state.session);

    const [favArray, setFavArray] = useState([]);

    useEffect(() => {
        if (!sesh.user) return history.push('/');
        if (!sesh.user.id) return history.push('/');
        if (sesh.user.id !== parseInt(userId, 10)) return history.push('/');
        dispatch(getUserDetail(userId)).then((res) => (
            setFavArray(res.Favorites.map(e => {
                let oldImages = [...e.Spot.Images];
                oldImages = oldImages.map(obj => obj.url);
                delete e.Spot.Images
                e.Spot['images'] = oldImages;
                e.Spot['fav'] = true;
                return e.Spot;
            }))
        ));
    }, [dispatch, history, sesh.user, userId]);

    return (
        <div className='profile-wrapper'>
            {sesh.user ?
            <>
            <div className='profile-container'>
                <h2>{sesh.user.username}'s Profile</h2>
                <div className='profile-info'>
                    <ProfileReviewContainer reviews={sesh.user.reviews} />
                    <ProfileBookingContainer bookings={sesh.user.bookings} />
                </div>
            </div>
            <div>
                <h2>Favorite Spots</h2>
                <div>
                    {
                        Object.values(favArray).length > 0 ?
                        Object.values(favArray).map((spot, i) => {
                            return (
                                <SpotCard spot={spot} key={i}/>
                            );
                        })
                        : null
                    }
                </div>
            </div>
            </>
                : null
            }
        </div>
    );
}

export default Profile;
