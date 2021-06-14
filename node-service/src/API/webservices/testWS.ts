import {Request, Response} from "express";
import testService from '../../core/services/testService';

function test(req: Request, res: Response)
{
    res.status(200).json({message: testService.testService()});
}

export default {test};