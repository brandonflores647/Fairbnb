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

        // if (images[0]) {
        //     const url = images[0];
        //     imgArr.push(await Image.create({spotId, url}));
        // }
        // if (images[1]) {
        //     const url = images[1];
        //     imgArr.push(await Image.create({spotId, url}));
        // }
        // if (images[2]) {
        //     const url = images[2];
        //     imgArr.push(await Image.create({spotId, url}));
        // }
        // if (images[3]) {
        //     const url = images[3];
        //     imgArr.push(await Image.create({spotId, url}));
        // }
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
