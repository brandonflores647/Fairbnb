import { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sesh = useSelector(state => state.session);

    const handleDispatch = () => {
        if (!sesh.user) return history.push('/');
        if (!sesh.user.id) return history.push('/');
        if (sesh.user.id !== parseInt(userId, 10)) return history.push('/');
        dispatch(getUserDetail(userId));
    }

    useEffect(() => {
        handleDispatch();
    }, [dispatch, history, sesh.user, userId]);


    return <h2>USER PROFILE!!!</h2>
}

export default Profile;
