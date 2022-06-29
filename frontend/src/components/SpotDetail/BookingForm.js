import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBookingThunk } from '../../store/booking'

const BookingForm = ({ userId, price }) => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spot);

    const todayDate = new Date();
    const today = todayDate.toISOString().split('T')[0];

    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [cost, setCost] = useState(price)

    useEffect(() => {
        // Calculate difference between start & end date
        const formattedStart = new Date(startDate);
        const formattedEnd = new Date(endDate);

        const diffInTime = formattedEnd.getTime() - formattedStart.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        setCost(parseInt(price, 10) + (parseInt(price, 10) * diffInDays));
    }, [startDate, endDate, price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let dispatchData;
        dispatchData = await dispatch(createBookingThunk({spotId: spot.data.id, userId, startDate, endDate, cost}))
            .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            })
        return dispatchData;
    }

    return (
        <>
            {spot.bookings[userId] ?
                <div>
                    <p>Looks like you've booked this spot! Go to your profile to modify your booking</p>
                </div>
            : (spot.data.userId === userId) ? null :
                <form onSubmit={handleSubmit}>
                    {errors.length > 0 ?
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul> : null}
                    <label>
                        Start
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={today}
                            max={endDate}
                        />
                    </label>
                    <label>
                        End
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={today}
                        />
                    </label>
                    <p>Total Cost: ${cost}</p>
                    <button type='submit'>Submit Booking</button>
                </form>
            }
        </>
    );
}

export default BookingForm;
