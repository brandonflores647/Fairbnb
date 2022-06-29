const ProfileReviewContainer = ({ reviews }) => {
    return (
        <div>
            <p>Your Reviews:</p>
            {reviews ?
                Object.values(reviews).map((ele, i) => {
                    return (
                        <div key={i}>
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
