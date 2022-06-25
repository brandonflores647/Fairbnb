import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail } from '../../store/spot';

const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    useEffect(() => {
        dispatch(getSpotDetail(spotId));
    }, [dispatch])
    const spot = useSelector(state => state.spot);
    if (spot.data) return (
        <>
            <h2>{spot.data.name}</h2>
            <p>{spot.data.price}</p>
            <p>{spot.data.address}</p>
            <p>{spot.data.city}</p>
            <p>{spot.data.state}</p>
            <p>{spot.data.country}</p>
            {Object.values(spot.images).map(img => {
                return <img src={img.url}/>
            })}
        </>
    )
    else return null;
}

export default SpotDetail;
