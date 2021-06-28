import {Request, Response} from "express";
import axios from 'axios';
import config from '../../config/config'

function authServiceVerifyToken(req: Request)
{
    return axios.get(config.services.auth + '/verify', {
        headers: {
            'Authorization': req.headers['authorization']
        }
    }).then((response) => {
        return new Promise((resolve, reject) => {
            if(response.status == 200) resolve(true);
            else reject();
        })
    });
}

export default {authServiceVerifyToken};