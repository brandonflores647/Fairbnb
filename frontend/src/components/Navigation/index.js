import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

const Navigation = ({ loaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        )
    } else {
        sessionLinks = (
            <>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    { loaded && sessionLinks }
                    <NavLink exact to='/'>Home</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
