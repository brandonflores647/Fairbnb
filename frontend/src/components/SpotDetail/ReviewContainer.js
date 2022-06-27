import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/review'

const ReviewContainer = ({ reviews }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(createReviewThunk({description}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <p>Reviews</p>
            <form onSubmit={handleSubmit}>
                <input></input>
            </form>
        </>
    );
}

export default ReviewContainer;
