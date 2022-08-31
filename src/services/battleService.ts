import axios from 'axios';
import { Request, Response } from 'express';

export default async function battleValidate(req: Request, res: Response, next: Function) {

    let { firstUser, secondUser } = req.body;

    try {

        firstUser = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        secondUser = await axios.get(`https://api.github.com/users/${secondUser}/repos`);

    } catch (error) {
        
        if (error.response.status === 404) {
            return res.status(404).send("Usuario não encontrado!");
        }

    }

    res.locals.firstUser = firstUser.data;
    res.locals.secondUser = secondUser.data;

    next();
}