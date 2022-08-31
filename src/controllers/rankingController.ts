import { Request, Response } from 'express';
import getRankingData from '../repositories/rankingRepository.js';

export default async function getRanking(req: Request, res: Response) {

    const ranking = await getRankingData();

    res.send({fighters: ranking.rows});
}