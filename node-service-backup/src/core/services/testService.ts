import jwt from 'jsonwebtoken';
import {Request} from "express";

import config from '../../config/config';

import {Test, TestRepository} from '../models/test';

function testService()
{
    return TestRepository.getTest().data;
}

export default {
    testService
};