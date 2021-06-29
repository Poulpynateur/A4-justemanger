import * as express from "express";
import httpProxy from 'express-http-proxy';
import { ParamsDictionary } from "express-serve-static-core";
import QueryString from "qs";

// XXX : Could be improved, anyway proxy is pretty usless as I use it
export function customProxy(serviceUrl: string)
{
    return function(to: string = '/') {
        return httpProxy(serviceUrl, {
            proxyReqPathResolver: function(req: express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>) {
                return req.baseUrl + req.url;
            }
        });
    }
}