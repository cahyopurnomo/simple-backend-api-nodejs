const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');

const userRules = [
   body('name')
      .notEmpty().withMessage('Nama tidak boleh kosong')
      .isLength({ min: 2 }).withMessage('Nama minimal 2 karakter'),

   body('email')
      .notEmpty().withMessage('Email tidak boleh kosong')
      .isEmail().withMessage('Format email tidak valid')
];

// Validator untuk CREATE user (email harus unik)
const validateCreateUser = [
   ...userRules,
   body('email').custom(async (email) => {
      const emailUsed = await User.isEmailTaken(email);
      if (emailUsed) {
         throw new Error("Email sudah digunakan");
      }
      return true;
   }),
   handleValidation
];

// Validator untuk UPDATE user (email harus unik tapi boleh milik sendiri)
const validateUpdateUser = [
   ...userRules,
   body('email').custom(async (email, { req }) => {
      const excludeId = req.params.id;
      const emailUsed = await User.isEmailTaken(email, excludeId);
      if (emailUsed) {
         throw new Error('Email sudah digunakan oleh user lain');
      }
      return true;
   }),
   handleValidation
];

// Middleware: tangani hasil validasi
function handleValidation(req, res, next) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({
         errors: errors.array().map(err => ({
            fields: err.param,
            message: err.msg
         }))
      });
   }
   next();
}

module.exports = {
   validateCreateUser,
   validateUpdateUser
};