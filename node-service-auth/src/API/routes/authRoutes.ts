import * as express from "express";
import authWS from '../webservices/authWS';
import authService from '../../core/services/authService';
import {body, header} from 'express-validator';
import validators from '../middleware/validators';

let router = express.Router();

router.post('/register', [
    body('username').notEmpty().custom(value => {
        return authService.isUsernameUnique(value)
        .then((unique: boolean) => {
            if (!unique)
                return Promise.reject('Username is already used.');
        })
    }),
    body('password').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('role').notEmpty(),
    validators.check
], authWS.register);
router.post('/login', [
    body('username').notEmpty(),
    body('password').notEmpty(),
    validators.check
], authWS.login);
router.post('/refresh', [
    body('username').notEmpty(),
    body('refreshToken').notEmpty(),
    validators.check
], authWS.refresh);
router.get('/verify', [
    header('authorization').notEmpty(),
    validators.check
], authWS.verify);

export default router;