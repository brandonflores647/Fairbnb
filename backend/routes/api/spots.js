const express = require('express')
const asyncHandler = require('express-async-handler');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { validateSignup } = require('../../utils/validation');
const { Spot } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    // validateSignup,
    asyncHandler(async (req, res) => {
        const { userId, address, city, state, country, name, price } = req.body;
        const spot = await Spot.create({
            userId,
            address,
            city,
            state,
            country,
            name,
            price
        });
        console.log(spot)

        return res.json({
          spot
        });
    })
);

module.exports = router;
