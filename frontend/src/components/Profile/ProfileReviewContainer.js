const ProfileReviewContainer = ({ reviews }) => {
    return (
        <div className='review-container'>
            <p>Your Reviews:</p>
            {reviews ?
                Object.values(reviews).map((ele, i) => {
                    return (
                        <div key={i} className='individual-review-container'>
                            <p>{ele.spot}</p>
                            <p>Description: </p>
                            <p>{ele.description}</p>
                            <p>Rating: </p>
                            <p>{ele.rating}</p>
                        </div>
                    )
                })
            : null}
        </div>
    );
}

export default ProfileReviewContainer;
