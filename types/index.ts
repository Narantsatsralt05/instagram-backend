import { Request, Response } from 'express';

export interface typeOfReqRes {
    request: Request;
    response: Response;
}

export interface typeOfUser {
    username: String,
    fullName: String,
    password: String,
    email: String,
}