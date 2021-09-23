import { Request, Response } from 'express';

export interface typeOfReqRes {
    request: Request;
    response: Response;
}