import {Request, Response} from "express";
import testService from '../../core/services/testService';

function test(req: Request, res: Response)
{
    res.status(200).json({message: testService.testService()});
}

function testSecured(req: Request, res: Response)
{
    res.status(200).json({payload: req.currentUser});
}

export default {test, testSecured};