import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spot';
import SpotCard from './SpotCard';

import './SpotsContainer.css';

const SpotsContainer = () => {
    const spots = useSelector(state => state.spot);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div className='spots-container'>
            {Object.values(spots).map(spot => {
                return <SpotCard spot={spot} />
            })}
        </div>
    );
}

export default SpotsContainer;
