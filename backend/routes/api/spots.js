const express = require('express')
const asyncHandler = require('express-async-handler');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { validateSignup } = require('../../utils/validation');
const { Spot, Image } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    // validateSignup,
    asyncHandler(async (req, res) => {
        const { userId, address, city, state, country, name, price, url } = req.body;

        const spot = await Spot.create({
            userId,
            address,
            city,
            state,
            country,
            name,
            price
        });
        const spotId = spot.id;

        const img = await Image.create({spotId, url})

        return res.json({
          spot,
          img
        });
    })
);

module.exports = router;
