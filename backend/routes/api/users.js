const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User, Review, Booking } = require('../../db/models');

const router = express.Router();

// Signup
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
);

// Load individual user
router.get('/:userId(\\d+)', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const user = await User.findByPk(userId);

  // const reviews = await Review.findAll({
  //     where: {
  //         spotId
  //     }
  // });
  // const bookings = await Booking.findAll({
  //     where: {
  //         spotId,
  //     }
  // });
  return res.json(user);
}));

module.exports = router;
