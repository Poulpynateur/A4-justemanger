import express from "express";
import httpProxy from 'express-http-proxy';

import authMiddleware from '../middleware/authMiddleware';
import {ServiceProxy, services} from '../proxy';

let router = express.Router();

/**** setup app routes ****/

for (const [name, ser] of Object.entries(services)) {
    const service: ServiceProxy = ser;

    for (var route of service.routes) {
        if (route.auth) router.use(route.from, authMiddleware.authenticateToken, httpProxy(service.uri + route.to));
        else router.use(route.from, httpProxy(service.uri + route.to));
    }
}
export default router;