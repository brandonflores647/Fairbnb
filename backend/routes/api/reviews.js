const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/validation');
const { Review } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    requireAuth,
    validateReview,
    asyncHandler(async (req, res) => {
        const { userId, spotId, description, rating } = req.body;

        const review = await Review.create({
            userId,
            spotId,
            description,
            rating
        });

        return res.json(review);
    })
);

module.exports = router;
