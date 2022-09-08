const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Spot, Favorite } = require('../../db/models');

const router = express.Router();

// Load All
router.get('/:userId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const data = await Favorite.findAll({
        where: {
          userId
        },
        attributes: ['spotId']
    });
    return res.json(data);
}));

module.exports = router;
