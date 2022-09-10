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

// Load One
router.get('/one/:userId(\\d+)/:spotId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const spotId = parseInt(req.params.spotId, 10);
  const data = await Favorite.findOne({
    where: {
      userId,
      spotId
    }
  });
  return res.json(data);
}));

// Set New
router.post('/new', requireAuth, asyncHandler(async (req, res) => {
  const { spotId, userId, fav } = req.body;

  const favorite = await Favorite.create({
    userId,
    spotId
  });

  return res.json({favorite, fav});
}));

// Remove
router.delete('/delete', requireAuth, asyncHandler(async (req, res) => {
  const { spotId, userId, fav } = req.body;

  const favorite = await Favorite.findOne({
    where: {
      userId,
      spotId
    }
  });
  await favorite.destroy();

  return res.json({favorite, fav});
}));

module.exports = router;
