import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';
import { restoreCSRF } from '../../store/csrf';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sesh = useSelector(state => state.session);

    useEffect(() => {
        dispatch(getUserDetail(userId))
            .then(res => {
                if (!res || !sesh.user) return history.push('/');
                if (res.id && (res.id !== sesh.user.id)) return history.push('/');
            });
    }, [dispatch, history, sesh.user, userId]);

    return <h2>USER PROFILE!!!</h2>
}

export default Profile;
