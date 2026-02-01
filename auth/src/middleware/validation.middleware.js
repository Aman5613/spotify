import { body, validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Validation errors', 
            success: false, 
            error: true, 
            data: errors.array() 
        });
    }
    next();
}

export const validateRegistration = [
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('fullName.lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validate
];