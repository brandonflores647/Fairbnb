import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { setFavoriteThunk, deleteFavoriteThunk } from '../../store/favorite';

const Heart = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [favCheck, setFavCheck] = useState(spot.fav?true:false);

    const handleFavorite = () => {
        if (!user) return history.push(`/login`);

        if (!spot.favorite && !favCheck) {
            dispatch(setFavoriteThunk({spotId: spot.id, userId: user.id, fav: spot.fav}));
            setFavCheck(true);
        } else {
            dispatch(deleteFavoriteThunk({spotId: spot.id, userId: user.id, fav: spot.fav}));
            setFavCheck(false);
        }
    }

    return (
        <button id='heart-button' onClick={handleFavorite}>
            <svg
                id='heart-svg'
                className={(spot.favorite && user) || favCheck ? 'heart-favorite' : ''}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
            >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
        </button>
    );
}

export default Heart;
