import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editBookingThunk } from '../../store/booking';

const IndividualBooking = ({ data }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [startDate, setStartDate] = useState(data.startDate.split('T')[0]);
    const [endDate, setEndDate] = useState(data.endDate.split('T')[0]);
    const [cost, setCost] = useState(data.cost);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let dispatchData;
        dispatchData = await dispatch(editBookingThunk({}))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
        if (dispatchData) setEditForm(!editForm);
        return dispatchData;
    }

    const handleCancel = () => {
        setEditForm(!editForm);
        setStartDate(data.startDate.split('T')[0]);
        setEndDate(data.endDate.split('T')[0]);
        setCost(data.cost);
    }

    useEffect(() => {
        // Calculate difference between start & end date
        const formattedStart = new Date(startDate);
        const formattedEnd = new Date(endDate);

        const diffInTime = formattedEnd.getTime() - formattedStart.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        setCost(parseInt(data.cost, 10) + (parseInt(data.cost, 10) * diffInDays));
    }, [startDate, endDate, data.cost]);

    return (
        <>
            {!editForm ?
            <div className='individual-booking-container'>
                <p>{data.spot}</p>
                <p>Start: </p>
                <p>{data.startDate.split('T')[0]}</p>
                <p>End: </p>
                <p>{data.endDate.split('T')[0]}</p>
                <p>Cost: </p>
                <p>$ {data.cost}</p>
            </div>
            :
            <form onSubmit={handleSubmit}>
                <p>{data.spot}</p>
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
                        min={data.startDate.split('T')[0]}
                        max={endDate}
                    />
                </label>
                <label>
                    End
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={data.startDate.split('T')[0]}
                    />
                </label>
                <p>Total Cost: ${cost}</p>
                <button type='submit'>Submit Booking</button>
            </form>
            }
        <button onClick={!editForm ? (e) => setEditForm(!editForm)
                        : handleCancel}>{editForm ? 'Cancel' : 'Edit'}</button>
        </>
    );
}

export default IndividualBooking;
