import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spot';
import { getAllFavoriteThunk } from '../../store/favorite';
import SpotCard from './SpotCard';
import FakeCard from './FakeCard';

import './SpotsContainer.css';

const SpotsContainer = () => {
    const spots = useSelector(state => state.spot);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    useEffect(() => {
        if (user) dispatch(getAllFavoriteThunk(user.id));
    }, [user]);

    return (
        <>
        {!spots.data ?
            <div className='spots-container'>
                {Object.values(spots).map((spot, i) => {
                    return (
                        <SpotCard spot={spot} key={i}/>
                    );
                })}
            </div>
        : (
            <div className='spots-container'>
                {Array.apply(null, Array(30)).map((ele, i) => {
                    return <FakeCard key={i}/>
                })}
            </div>
        )
        }
        </>
    );
}

export default SpotsContainer;
