import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(getUserDetail(userId))
            .then(res => {
                if (!res.id) history.push('/');
            });
    }, [dispatch, history])

    return <h2>USER PROFILE!!!</h2>
}

export default Profile;
