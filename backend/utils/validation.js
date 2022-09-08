const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { isValidStateInput } = require('usa-state-validator');

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
  check('name')
    .isLength({ max: 32 })
    .withMessage('Name cannot be longer than 32 characters.'),
  check('price')
    .custom((value) => {
      if (value > 99999) {
        throw new Error('Cost per night cannot be more than $99,999')
      }
      return true;
  }),
  check('address')
    .isLength({ min: 8 })
    .withMessage('Address must be atleast 8 characters.'),
  check('address')
    .isLength({ max: 64 })
    .withMessage('Address cannot be longer than 64 characters.'),
  check('city')
    .isLength({ min: 4 })
    .withMessage('City must be atleast 4 characters.'),
  check('city')
    .isLength({ max: 64 })
    .withMessage('City cannot be longer than 64 characters.'),
  check('state')
    .custom((val, {req}) => {
      return isValidStateInput(val);
    })
    .withMessage('State must be valid in the USA.'),
  check('state')
    .isLength({ max: 20 })
    .withMessage('State cannot be longer than 20 characters.'),
  check('country')
    .isLength({ min: 4 })
    .withMessage('Country must be atleast 4 characters.'),
  check('country')
    .isLength({ max: 64 })
    .withMessage('Country cannot be longer than 64 characters.'),
  check('imgInput')
    .custom((val, {req}) => {
      if (req.files) {
        for (let file of req.files) {
          if (
            file.mimetype !== 'image/png'
            && file.mimetype !== 'image/jpeg'
            && file.mimetype !== 'image/jpg'
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .withMessage('Image must be .png, .jpg, or .jpeg'),
  check('imgInput')
    .custom((val, {req}) => {
      if (req.files && !req.files.length && !req.body.oldImages) return false;
      return true;
    })
    .withMessage('At least one image is required.'),
  check('imgInput')
    .custom((val, {req}) => {
      if (req.files && req.files.length > 4) return false;
      if (req.body.images > 4) return false;
      return true;
    })
    .withMessage('Sorry! Spots are limited to 4 images.'),
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

const validateReview = [
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description."),
  check('description')
    .custom((value) => {
      if (value && value.length < 6) {
        throw new Error('Uh oh! Reviews must be atleast 6 characters in length.');
      }
      if (value && value.length > 200) {
        throw new Error(`Sorry! Reviews are limited to 200 characters. This review has ${value.length}.`);
      }
      return true;
    }),
  check('rating')
    .custom((value) => {
      if (parseInt(value, 10) > 5) {
        throw new Error('Uh oh! Reviews cannot be rated higher than 5 stars.');
      }
      if (parseInt(value, 10) < 1) {
        throw new Error('Uh oh! Reviews cannot be rated lower than 1 star.');
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
  validateReview,
};
