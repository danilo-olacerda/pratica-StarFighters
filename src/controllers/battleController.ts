import { Request, Response } from 'express';
import registerBattleResults from '../repositories/battleRepository.js';

export default async function resolveBattle(req: Request, res: Response, next: Function) {

    let { firstUser, secondUser } = res.locals;
    let firstUserStargazers: number = 0;
    let secondUserStargazers: number = 0;

    for (let repo of firstUser) {
        firstUserStargazers += repo.stargazers_count;
    }

    for (let repo of secondUser) {
        secondUserStargazers += repo.stargazers_count;
    }

    if (firstUserStargazers > secondUserStargazers) {

        firstUser = {
            name: req.body.firstUser,
            status: "winner"
        }
        secondUser = {
            name: req.body.secondUser,
            status: "loser"
        }

        const winnerResponse = {
            winner: firstUser.name,
            loser: secondUser.name,
            draw: false
        }

        await registerBattleResults(firstUser, secondUser);

        res.send(winnerResponse);

    } else if (firstUserStargazers < secondUserStargazers) {

        firstUser = {
            name: req.body.firstUser,
            status: "loser"
        }
        secondUser = {
            name: req.body.secondUser,
            status: "winner"
        }

        const winnerResponse = {
            winner: secondUser.name,
            loser: firstUser.name,
            draw: false
        }

        await registerBattleResults(firstUser, secondUser);

        res.send(winnerResponse);

    } else {
            
            firstUser = {
                name: req.body.firstUser,
                status: "draw"
            }
            secondUser = {
                name: req.body.secondUser,
                status: "draw"
            }
    
            const winnerResponse = {
                winner: null,
                loser: null,
                draw: true
            }
    
            await registerBattleResults(firstUser, secondUser);
    
            res.send(winnerResponse);
    
    }

}