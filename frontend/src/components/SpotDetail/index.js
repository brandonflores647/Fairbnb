import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail } from '../../store/spot';
import SpotEditForm from '../SpotEditForm';
import BookingForm from './BookingForm';
import ReviewContainer from './ReviewContainer';
import PhotoCard from './PhotoCard';

const SpotDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [editForm, setEditForm] = useState(false);

    useEffect(() => {
        dispatch(getSpotDetail(spotId))
            .then(res => {
                if (!res.spot) history.push('/');
            });
    }, [dispatch, history, spotId])

    let userId;
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) userId = sessionUser.id;
    const spot = useSelector(state => state.spot);
    const reviews = useSelector(state => state.spot.reviews);

    if (spot.data) return (
        <>
            {sessionUser && sessionUser.id === spot.data.userId ?
                <button onClick={() => setEditForm(!editForm)}
                    >{editForm ? 'Cancel Edit' : 'Edit'}</button> : null}

            {editForm ?
                <SpotEditForm hideForm={() => setEditForm(false)}/>
            :
                <div id='spot-page-top-container'>
                    <PhotoCard spot={spot} />
                    <div id='spot-page-details'>
                        <section>
                            <h2 id='spot-page-name'>{spot.data.name}</h2>
                            <p id='spot-page-price'>$ {spot.data.price} <span>night</span></p>
                            <p className='spot-page-details'>{spot.data.address}</p>
                            <p className='spot-page-details'>{spot.data.city}, {spot.data.state}</p>
                            <p className='spot-page-details'>{spot.data.country}</p>
                        </section>
                        <BookingForm userId={userId} price={spot.data.price} />
                    </div>
                </div>
            }

            <ReviewContainer reviews={reviews}/>
        </>
    )
    else return <p>Loading...</p>;
}

export default SpotDetail;
