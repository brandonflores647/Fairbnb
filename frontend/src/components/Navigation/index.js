import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ loaded }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleDemoLogin = () => {
        const emails = ['demo@user.io', 'user1@user.io', 'user2@user.io'];
        return dispatch(sessionActions.login({
            credential: emails[Math.floor(Math.random()*emails.length)],
            password: 'P@ssw0rd!'
        }))
    }

    return (
        <nav className='nav-bar-container'>
            <NavLink exact to='/'>
            <div id='left-nav-info'>
                <svg id="left-nav-icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 799.73 707.45" width='50px'>
                  <path class="cls-1" d="M327.82,753.22c-11.91,0-23.86,0-35.72,0-9.8,0-20.32-.29-34.11-.93-19.74-.92-38-8.9-57.5-25.12-18.73-15.61-27-37-32.11-53.83-7.24-23.82-10.08-48.76-8.7-76.24a12.24,12.24,0,0,0-.12-3.63,18,18,0,0,0-4.46-.78q-6.6-.66-13.22-1.28c-17.69-1.7-36-3.45-53.85-6.4-12.32-2.1-26.49-5-38.79-12.56-19.92-12.31-34.18-30.06-42.38-52.76-8-22.24-9-44.35-2.9-65.71,1.87-6.6,5.07-12.72,8.16-18.65l.84-1.61c3.55-6.8,7.25-13.66,10.83-20.29,4.08-7.56,8.3-15.38,12.31-23.13C48,367.21,60.12,343.74,71.81,321q14.63-28.44,29.29-56.85c23.7-45.88,47.72-92.31,71.41-138,1.84-3.56,3.62-7.28,5.35-10.88,3.91-8.18,8-16.64,13.12-24.37,12.65-18.82,31.34-31.88,57.13-40,11.8-3.68,24.58-5.38,39.1-5.18,16.08.22,29.91,6.26,43.82,13a190.14,190.14,0,0,1,42,27.83c7.14,6.17,13.89,13,20.41,19.51l2.4,2.41a41.09,41.09,0,0,0,3.44,3.22,31.83,31.83,0,0,0,2.95-2.6c17.22-16.55,35.66-29.93,58-45.71C485,45.83,513.67,41.75,545.39,51.28a106.69,106.69,0,0,1,58.85,43.17,87.23,87.23,0,0,1,6.5,12c.88,1.85,1.79,3.76,2.73,5.57,2.68,5.33,5.34,10.72,7.91,15.93,5.14,10.43,10.45,21.21,16,31.58,10.62,19.71,21.62,39.62,32.26,58.88,6.09,11,12.39,22.42,18.54,33.65q13.29,24.24,26.52,48.51c15,27.54,30.58,56,46,84,6.73,12.19,14.07,24.37,21.17,36.14,1.43,2.36,2.85,4.71,4.26,7.07,10.84,18.09,15.21,38.58,13,60.9-3.09,30.59-15.5,55.51-36.88,74.08-14.66,12.72-29.17,20.3-44.36,23.18l-5.3,1c-20.14,3.8-41,7.73-62.12,7.61-2.13,0-4.23-.19-6.26-.38-1.14-.11-2.27-.22-3.4-.28-2.84-.17-3.74.37-4,.61-.52.49-.84,1.85-.88,3.74-.31,23.42-3.09,47.76-8.52,74.37-6.28,30.76-23.65,54-51.64,69a87.87,87.87,0,0,1-42,10.85c-32.15-.1-64.82-.08-96.41-.06H403v.74h-4l-35.62,0Zm156.24-31.05c8.11,0,16.28.08,24.38.31,14.77.43,30.1-2.39,48.21-8.91,17.38-6.25,29.07-18.6,33.81-35.71,6.85-24.74,10.79-50.94,12-80.11.32-7.46.18-7.63-7.6-9.15-23.75-4.66-47.77-9.48-71.39-14.34-16.48-3.4-32.4-11.2-48.65-23.87-7.76-6.07-13.12-13.87-18.31-21.43-1.09-1.58-2.18-3.17-3.29-4.74-6.26-8.83-8.07-18.79-9.09-28.23a108.75,108.75,0,0,1,.55-26.86,78.33,78.33,0,0,1,13.06-34c14.33-20.45,31.32-31.66,51.95-34.32,11.16-1.44,20.14-1.58,28.28-.45,14.6,2,28.85,8.95,42.35,20.52a119.3,119.3,0,0,1,13.82,14.63c9.52,11.48,17.18,25.56,24.06,44.25,5.45,14.84,9.09,30.5,12.61,45.65l.28,1.24c2,8.57,2.85,17.43,3.67,26l.26,2.62c.44,4.59,3,4.54,3.94,4.52,4.18-.08,8.41-.06,12.5,0,12.39,0,24.08.09,35.95-2.35,2.08-.42,4.15-.82,6.23-1.21,9.18-1.74,17.85-3.39,25.87-7.75,1.23-.67,2.47-1.32,3.7-2,8.64-4.59,16.81-8.93,22.45-16.37a90.76,90.76,0,0,0,16.56-35.59c3.48-15.94,2-30.36-4.69-44.06-2.89-6-6.23-12-9.45-17.72-1.77-3.17-3.59-6.44-5.34-9.7-8.18-15.3-16.47-30.86-24.64-46.24L657.67,263.28q-6.45-12.12-12.83-24.28c-8.57-16.28-17.43-33.12-26.46-49.53-3.8-6.92-7.48-14-11-20.9-8.89-17.18-18.08-34.95-29.82-50.83-17.26-23.34-38-34.86-63.5-35.22a60.33,60.33,0,0,0-24.48,4.89c-8.54,3.71-17.3,9.08-27.54,16.87-11.19,8.52-22.05,18-32.55,27.07l-4.34,3.77c-3.11,2.71-3.62,3.71-3.65,4.06-.07,1,2.13,4.14,2.95,5.32,9,12.8,17.95,25.77,26.75,38.54,12.22,17.86,23.63,35.64,28.94,57,4.26,17.14,4.4,32.64.42,47.37-7.22,26.82-24,46.37-49.88,58.1a80.85,80.85,0,0,1-33.22,7c-20.45,0-40.86-7.27-55.14-20.85C321,311.38,312.37,285.26,316.55,254c3.15-23.63,12.72-44.69,20.7-60.39,8.86-17.42,20.62-35,35.94-53.64,1.89-2.31,1.28-2.9.28-3.89q-3.24-3.27-6.41-6.53c-6-6.11-12.16-12.42-18.62-18.14-13-11.35-28.19-20.44-46.58-27.78-10.87-4.33-23-4.62-38.32-.9-18.2,4.43-31.63,12.44-41.05,24.47-4.15,5.31-7.48,11.65-10.71,17.78l-1.07,2c-6.79,12.87-13.62,26-20.23,38.69-7,13.37-14.16,27.19-21.33,40.77-22.66,42.81-45.71,86.14-68.53,128.78Q95.1,345.58,89.53,356c-9.29,17.34-18.9,35.27-28,53.06-2.25,4.38-4.67,8.72-7,12.92-6.32,11.32-12.29,22-15.53,34.2-5.27,19.93-4.78,37.37,1.5,53.33C48.79,530.6,62.36,543.11,82,547.7c27.15,6.33,52.22,9.64,76.64,10.09a22,22,0,0,0,4.7-.23,21.56,21.56,0,0,0,1.2-4.51c2.27-12,4.49-24.29,6.65-36.14q1.92-10.57,3.86-21.14c4.5-24.7,11.83-43.36,23.07-58.72,13.51-18.47,30.42-30.32,50.27-35.22a90,90,0,0,1,53.28,2.94c14.87,5.3,28.54,15.72,38.45,29.33,10.07,13.8,15.57,30,15.5,45.65-.12,28.37-11.9,51.85-35,69.77-18.74,14.53-41.4,25.2-67.37,31.72-14.48,3.63-29.43,6-43.89,8.33q-5.38.85-10.75,1.74c-3,.51-3.45,1.22-3.67,3.79-2.15,25.22,1.15,50.54,10.09,77.39,5.45,16.39,15.37,28.68,30.32,37.56,14.15,8.42,29.81,12.3,47.86,11.85,22.58-.55,45.52-.45,67.71-.35q13.59.06,27.18.07l68.91.06h4v.66l14.55-.08C471.63,722.22,477.83,722.17,484.06,722.17ZM199.45,555.89a22.79,22.79,0,0,0,3.87-.15c36.38-3.69,66.32-13.51,91.53-30,16.35-10.72,25.26-26.19,26.48-46-.12-.89-.22-1.83-.32-2.78a40.08,40.08,0,0,0-1.06-6.69,51.56,51.56,0,0,0-70.06-32.33c-18.36,8.41-30.58,24-36.34,46.21-4.53,17.59-7.83,35.89-11,53.59q-1.31,7.26-2.64,14.51A21.37,21.37,0,0,0,199.45,555.89ZM523.9,432.76c-18.54,0-37.85,17.08-43.1,33-6.8,20.68-2.76,38.81,12,53.87,6.42,6.54,15.23,12.4,25.46,16.92,10.61,4.72,22.55,7.25,33.09,9.49,11.26,2.39,22.86,4.29,34.08,6.13q6.39,1,12.76,2.12a6.42,6.42,0,0,0,1.92.11,6,6,0,0,0,.12-1.84,94,94,0,0,0-1.28-13.38c-3.71-19.59-8.48-36.57-14.57-51.84-7.87-19.63-18-33.82-31.9-44.64a45.26,45.26,0,0,0-26.94-9.92h-.09C524.93,432.77,524.42,432.76,523.9,432.76ZM397,166.1a3.59,3.59,0,0,0-.7.69c-2.32,2.84-4.53,5.88-6.67,8.82L387.17,179c-18.13,24.57-29.81,49.39-35.71,75.88a56,56,0,0,0,5.19,39.38c12.92,24.28,40.4,27.85,60.86,18.84,18.82-8.21,30.13-23.93,31.06-43.14.25-16.33-2.1-27.33-7.84-36.79-10.58-17.38-22.08-34.64-33.21-51.34q-5.08-7.65-10.17-15.31A2.55,2.55,0,0,0,397,166.1Z" transform="translate(-0.01 -45.78)"/>
                </svg>

                <svg id="left-nav-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752.72 169.4" width="80px">
                  <g>
                    <path d="M1.16,173.5V9H108.73V32.8H31V79.23h72.8V103H31V173.5Z" transform="translate(-1.16 -6.43)"/>
                    <path d="M155.39,175.83a49.28,49.28,0,0,1-22-4.78,38.18,38.18,0,0,1-15.16-13,32.31,32.31,0,0,1-5.49-18.44q0-12.6,6.54-20t21.23-10.61q14.7-3.27,39.43-3.27h8.17v-4.9q0-11.67-5.13-16.8T165.66,79a70.18,70.18,0,0,0-19.6,2.91,88.61,88.61,0,0,0-20.3,9l-8.4-19.84a66.87,66.87,0,0,1,14.35-7.35,103.5,103.5,0,0,1,17.5-4.9,93.91,93.91,0,0,1,17.38-1.75q25,0,37.1,11.55t12.14,35.82V173.5h-27.3V155.3a31.92,31.92,0,0,1-12.6,15Q167.29,175.83,155.39,175.83Zm6.07-20.07a25.22,25.22,0,0,0,19-7.93q7.58-7.94,7.58-20.07v-5.13h-7.93q-21.94,0-30.45,3.38t-8.52,12.25a16.27,16.27,0,0,0,5.37,12.6Q151.89,155.76,161.46,155.76Z" transform="translate(-1.16 -6.43)"/>
                    <path d="M236.59,34.9V6.43h32.67V34.9Zm1.87,138.6V59.4h29.17V173.5Z" transform="translate(-1.16 -6.43)"/>
                    <path d="M291,173.5V59.4h28.46V79.46q8.4-20.29,35.94-22.4l8.86-.7,1.87,24.74-16.8,1.63q-28.69,2.8-28.7,29.4V173.5Z" transform="translate(-1.16 -6.43)"/>
                    <path d="M441.22,175.83a45,45,0,0,1-22.51-5.6,36,36,0,0,1-14.82-15.17V173.5H375.42V9h29.17V76.2A37.61,37.61,0,0,1,419.4,62.31a45,45,0,0,1,21.82-5.25q15.16,0,26.37,7.24a48.61,48.61,0,0,1,17.5,20.41q6.3,13.19,6.3,31.62,0,18.2-6.3,31.62a48,48,0,0,1-17.62,20.65Q456.15,175.83,441.22,175.83Zm-8.17-22.17q13.08,0,21-9.45T462,116.33q0-18.66-7.94-27.88t-21-9.22q-13.07,0-21,9.22t-7.93,27.88q0,18.44,7.93,27.88T433.05,153.66Z" transform="translate(-1.16 -6.43)"/>
                    <path d="M508.42,173.5V59.4h28.46V77.13A38.8,38.8,0,0,1,552.63,62.2a47.82,47.82,0,0,1,22.29-5.14q40.37,0,40.36,46.9V173.5H586.12V105.36q0-13.29-5-19.36t-15.51-6.07q-12.84,0-20.42,8t-7.58,21.35V173.5Z" transform="translate(-1.16 -6.43)"/>
                    <path d="M703.72,175.83a45,45,0,0,1-22.52-5.6,36.14,36.14,0,0,1-14.82-15.17V173.5H637.92V9h29.16V76.2A37.57,37.57,0,0,1,681.9,62.31a45,45,0,0,1,21.82-5.25q15.16,0,26.36,7.24a48.54,48.54,0,0,1,17.5,20.41q6.3,13.19,6.3,31.62,0,18.2-6.3,31.62A48,48,0,0,1,730,168.6Q718.65,175.83,703.72,175.83Zm-8.17-22.17q13.07,0,21-9.45t7.93-27.88q0-18.66-7.93-27.88t-21-9.22q-13.06,0-21,9.22t-7.93,27.88q0,18.44,7.93,27.88T695.55,153.66Z" transform="translate(-1.16 -6.43)"/>
                  </g>
                </svg>
            </div>
            </NavLink>
            <div id='right-nav-info'>
                {sessionUser ? <p id='right-nav-welcome'>Welcome {sessionUser.username}</p>
                    : <div id='right-nav-demo-login' onClick={handleDemoLogin}>Demo Login</div>}
                { loaded && <ProfileButton user={sessionUser} /> }
            </div>
        </nav>
    );
}

export default Navigation;
