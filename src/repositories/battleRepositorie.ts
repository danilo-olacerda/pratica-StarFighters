import client from "../db/db.js";

export default async function registerBattleResults(firstUser: {name: string, status: string}, secondUser: {name: string, status: string}) {

    const firstUserExists = await client.query(`SELECT * FROM  fighters WHERE username = '${firstUser.name}'`);
    const secondUserExists = await client.query(`SELECT * FROM fighters WHERE username = '${secondUser.name}'`);

    if (firstUserExists.rowCount === 0) {
        await client.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`, [firstUser.name, firstUser.status==="winner" ? 1 : 0, firstUser.status==="loser" ? 1 : 0, firstUser.status==="draw" ? 1 : 0]);
    } else {
        await client.query(`UPDATE fighters SET ${firstUser.status === "winner" ? "wins" : firstUser.status === "loser" ? "losses" : "draws"} = ${firstUser.status === "winner" ? "wins" : firstUser.status === "loser" ? "losses" : "draws"} + 1 WHERE username = $1`, [firstUser.name]);
    }

    if (secondUserExists.rowCount === 0) {
        await client.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`, [secondUser.name, secondUser.status==="winner" ? 1 : 0, secondUser.status==="loser" ? 1 : 0, secondUser.status==="draw" ? 1 : 0]);
    } else {
        await client.query(`UPDATE fighters SET ${secondUser.status === "winner" ? "wins" : secondUser.status === "loser" ? "losses" : "draws"} = ${secondUser.status === "winner" ? "wins" : secondUser.status === "loser" ? "losses" : "draws"} + 1 WHERE username = $1`, [secondUser.name]);
    }

    return;
}