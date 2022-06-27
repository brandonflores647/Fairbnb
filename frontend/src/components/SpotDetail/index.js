import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail } from '../../store/spot';
import SpotEditForm from '../SpotEditForm';

const SpotDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [editForm, setEditForm] = useState(false);

    useEffect(() => {
        dispatch(getSpotDetail(spotId));
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot);

    if (spot.data) return (
        <>
            {sessionUser && sessionUser.id === spot.data.userId ?
                <button onClick={() => setEditForm(!editForm)}
                    >{editForm ? 'Cancel Edit' : 'Edit'}</button> : null}

            {editForm ?
                <SpotEditForm hideForm={() => setEditForm(false)}/>
            :
                <>
                    <h2>{spot.data.name}</h2>
                    <p>{spot.data.price}</p>
                    <p>{spot.data.address}</p>
                    <p>{spot.data.city}</p>
                    <p>{spot.data.state}</p>
                    <p>{spot.data.country}</p>
                    {Object.values(spot.images).map((img, i) => {
                        return <img key={i} src={img.url}/>
                    })}
                </>
            }
        </>
    )
    else return <p>Loading...</p>;
}

export default SpotDetail;
