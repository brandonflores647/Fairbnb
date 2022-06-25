import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail } from '../../store/spot';

const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    useEffect(() => {
        dispatch(getSpotDetail(spotId));
    }, [])
    const spot = useSelector(state => state.spot);
    if (spot.id) return (
        <h2>{spot.name}</h2>
    )
    else return null;
}

export default SpotDetail;
