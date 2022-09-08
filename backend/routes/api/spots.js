const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateSpot, validateSpotDelete } = require('../../utils/validation');
const { Spot, Image, Review, Booking } = require('../../db/models');
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../s3');

const router = express.Router();

// Create
router.post(
    '/',
    multipleMulterUpload('images'),
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res) => {
        const { userId, address, city, state, country, name, price } = req.body;

        const imageUrls = await multiplePublicFileUpload(req.files);
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
        for (let url of imageUrls) {
            imgArr.push(await Image.create({spotId, url}));
        }

        return res.json({
          spot,
          imgArr
        });
    })
);

// Load All
router.get('/all', asyncHandler(async (req, res) => {
    const data = await Spot.findAll({
        include: [
            {
                model: Image,
                attributes: ['url']
            },
            {
                model: Review,
                attributes: ['rating']
            }
        ]
    });
    return res.json(data);
}));

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
    const bookings = await Booking.findAll({
        where: {
            spotId,
        }
    });
    return res.json({spot, images, reviews, bookings});
}));

// Update individual
router.patch('/:spotId(\\d+)',
    multipleMulterUpload('images'),
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res) => {
        const spotId = parseInt(req.params.spotId, 10);
        const spot = await Spot.findByPk(spotId);

        const imgArr = [];
        if (req.files.length) {
            // remove old images from DB
            const imgs = await Image.findAll({ where: { spotId } });
            for (let img of imgs) {
                await img.destroy();
            }

            // create new images in s3 bucket + DB
            const imageUrls = await multiplePublicFileUpload(req.files);
            for (let url of imageUrls) {
                imgArr.push(await Image.create({spotId, url}));
            }
        } else {
            const imgSplit = req.body.oldImages.split(',');
            for (let url of imgSplit) {
                const curImg = await Image.findOne({ where: { url } });
                imgArr.push(curImg);
            }
        }

        spot.address = req.body.address;
        spot.city = req.body.city;
        spot.state = req.body.state;
        spot.country = req.body.country;
        spot.name = req.body.name;
        spot.price = req.body.price;

        await spot.save();
        return res.json({spot, imgArr});
}));

// Delete individual
router.delete('/:spotId(\\d+)',
    requireAuth,
    validateSpotDelete,
    asyncHandler(async (req, res) => {
        const spotId = req.body.spot.id;

        // destroy spot from DB
        const spot = await Spot.findByPk(spotId);
        await spot.destroy();

        return res.json({});
}));

module.exports = router;
