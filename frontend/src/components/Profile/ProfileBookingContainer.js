import IndividualBooking from "./IndividualBooking";

const ProfileBookingContainer = ({ bookings }) => {
    return (
        <div className='booking-container'>
            <p>Your Bookings:</p>
            {bookings ?
                Object.values(bookings).map((ele, i) => {
                    if (ele) {
                        return (
                            <IndividualBooking key={i} data={ele}/>
                        );
                    } else {
                        <></>
                    }
                })
            : null}
        </div>
    );
}

export default ProfileBookingContainer;
