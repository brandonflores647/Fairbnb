import IndividualBooking from "./IndividualBooking";

const ProfileBookingContainer = ({ bookings }) => {
    return (
        <div className='booking-container'>
            <p className='list-title'>Your Bookings:</p>
            <div className='booking-list'>
                {bookings && Object.keys(bookings).length > 0 ?
                    Object.values(bookings).map((ele, i) => {
                        if (ele) {
                            return (
                                <IndividualBooking key={i} data={ele}/>
                            );
                        } else {
                            return <></>
                        }
                    })
                : <p>No bookings have been made on this account.</p>}
            </div>
        </div>
    );
}

export default ProfileBookingContainer;
