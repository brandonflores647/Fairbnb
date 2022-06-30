import IndividualBooking from "./IndividualBooking";

const ProfileBookingContainer = ({ bookings }) => {
    return (
        <div className='booking-container'>
            <p>Your Bookings:</p>
            {bookings ?
                Object.values(bookings).map((ele, i) => {
                    return (
                        <IndividualBooking key={i} data={ele}/>
                    );
                })
            : null}
        </div>
    );
}

export default ProfileBookingContainer;
