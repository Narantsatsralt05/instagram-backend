import { Request, Response } from 'express';

export interface typeOfReqRes {
    request: Request;
    response: Response;
}

export interface typeOfUser {
    username: string,
    fullName: string,
    password: string,
    email: string,
}