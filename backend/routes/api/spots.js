const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateSpot } = require('../../utils/validation');
const { Spot, Image, Review } = require('../../db/models');

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

// Load individual
router.get('/:spotId(\\d+)', asyncHandler(async (req, res) => {
    const spotId = parseInt(req.params.spotId, 10);
    const spot = await Spot.findByPk(spotId);
    const images = await Image.findAll({
        where: {
            spotId
        }
    });
    const reviews = await Review.findAll({
        where: {
            spotId
        }
    });
    return res.json({spot, images, reviews});
}));

// Update
router.patch('/:spotId(\\d+)',
    requireAuth,
    // validateSpot,
    asyncHandler(async (req, res) => {
    const spotId = parseInt(req.params.spotId, 10);
    const spot = await Spot.findByPk(spotId);

    const imgArr = [];

    for (let url of req.body.images) {
        if (url) {
            imgArr.push(await Image.findOne({ where: { url } }));
            const img = await Image.findAll({ where: { url } });
            if (!img.length) {
                await Image.create({spotId, url});
            }
        }
    }

    const reviews = await Review.findAll({
        where: {
            spotId
        }
    });

    spot.address = req.body.address;
    spot.city = req.body.city;
    spot.state = req.body.state;
    spot.country = req.body.country;
    spot.name = req.body.name;
    spot.price = req.body.price;

    await spot.save();

    return res.json({spot, imgArr, reviews});
}));

module.exports = router;
