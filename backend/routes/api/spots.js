const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateSpot } = require('../../utils/validation');
const { Spot, Image } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res) => {
        const { userId, address, city, state, country, name, price, images } = req.body;

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
        const imgArr = [];

        for (let url of images) {
            if (url) imgArr.push(await Image.create({spotId, url}));
        }

        return res.json({
          spot,
          imgArr
        });
    })
);

module.exports = router;
