import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail } from '../../store/spot';

const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spot);

    useEffect(() => {
        dispatch(getSpotDetail(spotId));
    }, [])

    return (
        <h2>{spot.name}</h2>
    );
}

export default SpotDetail;
