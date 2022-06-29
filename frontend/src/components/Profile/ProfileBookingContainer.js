const ProfileBookingContainer = ({ bookings }) => {
    return (
        <div>
            <p>Your Bookings:</p>
            {bookings ?
                Object.values(bookings).map((ele, i) => {
                    return (
                        <div key={i}>
                            <p>Start: </p>
                            <p>{ele.startDate.split('T')[0]}</p>
                            <p>End: </p>
                            <p>{ele.endDate.split('T')[0]}</p>
                            <p>Cost: </p>
                            <p>{ele.cost}</p>
                        </div>
                    );
                })
            : null}
        </div>
    );
}

export default ProfileBookingContainer;
