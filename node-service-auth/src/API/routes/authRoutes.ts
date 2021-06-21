import * as express from "express";
import authWS from '../webservices/authWS';
import {body, header} from 'express-validator';
import validators from '../middleware/validators';

let router = express.Router();

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