import { Request, Response } from 'express';
import { Date } from 'mongoose';

export interface typeOfReqRes {
    request: Request;
    response: Response;
}

export interface typeOfUser {
    username: string,
    fullName: string,
    password: string,
    email: string,
    lastLogin?: Date,
}