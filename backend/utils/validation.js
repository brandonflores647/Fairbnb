const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

// Custom middleware validators
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

const validateSpot = [
  check('name')
  .exists({ checkFalsy: true })
  .withMessage("Please provide a name."),
  check('name')
  .not()
  .isEmail()
  .withMessage('Please provide a proper value for the name field.'),
  check('name')
  .isLength({ min: 5 })
  .withMessage('Name must be atleast 5 characters.'),
  check('address')
  .isLength({ min: 8 })
  .withMessage('Address must be atleast 8 characters.'),
  check('city')
  .isLength({ min: 4 })
  .withMessage('City must be atleast 4 characters.'),
  check('state')
  .isLength({ min: 4 })
  .withMessage('State must be atleast 4 characters.'),
  check('country')
  .isLength({ min: 4 })
  .withMessage('Country must be atleast 4 characters.'),
  check('images[0]')
  .exists({ checkFalsy: true })
  .withMessage('Please provide your cover image in the first input field.'),
  check('images[0]')
  .isLength({ min: 4 })
  .withMessage('Uh oh! Looks like your first image is invalid.'),
  check('images[0]')
  .isLength({ max: 255 })
  .withMessage('Uh oh! Looks like your first image url is too long! Please compress it.'),
  check('images[1]')
  .custom((value) => {
      if (value && value.length < 6) {
        throw new Error('Uh oh! Looks like your second image is invalid.');
      }
      if (value && value.length > 255) {
        throw new Error('Uh oh! Looks like your second image url is too long! Please compress it.');
      }
      return true;
    }),
    check('images[2]')
    .custom((value) => {
      if (value && value.length < 6) {
        throw new Error('Uh oh! Looks like your third image is invalid.');
      }
      if (value && value.length > 255) {
        throw new Error('Uh oh! Looks like your third image url is too long! Please compress it.');
      }
      return true;
    }),
    check('images[3]')
    .custom((value) => {
      if (value && value.length < 6) {
        throw new Error('Uh oh! Looks like your fourth image is invalid.');
      }
      if (value && value.length > 255) {
        throw new Error('Uh oh! Looks like your fourth image url is too long! Please compress it.');
      }
      return true;
    }),
    handleValidationErrors
];

const validateSpotDelete = [
    check('spot')
      .custom((value, { req }) => {
        if (value.name !== req.body.deleteInput) {
          throw new Error("The provided name does not match this spots name.");
        }
        return true;
      }),
    handleValidationErrors
];

  module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateSpot,
  validateSpotDelete,
};
