import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BookingForm = ({ userId, price }) => {

    const todayDate = new Date();
    const today = todayDate.toISOString().split('T')[0];

    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [cost, setCost] = useState(price)

    useEffect(() => {
        // Calculate difference between start & end date
        const formattedStart = new Date(startDate)
        const formattedEnd = new Date(endDate)

        const diffInTime = formattedEnd.getTime() - formattedStart.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        setCost(parseInt(price, 10) + (parseInt(price, 10) * diffInDays));
    }, [startDate, endDate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
    }

    return (
        <>
            {errors.length > 0 ?
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null}

            <form onSubmit={handleSubmit}>
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
        </>
    );
}

export default BookingForm;
