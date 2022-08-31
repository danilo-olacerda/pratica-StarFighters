import { Request, Response } from 'express';

export default function battleValidate(req: Request, res: Response, next: Function) {

    const { firstUser, secondUser } = req.body;

    if (!firstUser || !secondUser) {
        return res.status(400).send("Os usuarios não podem ser vazios!");
    }

    if (typeof firstUser !== 'string' || typeof secondUser !== 'string') {
        return res.status(400).send("Os usuarios devem ser strings!");
    }

    next();
}