import client from "../db/db.js";

export default async function getRankingData() {
    return await client.query(`SELECT username, wins, losses, draws FROM fighters ORDER BY wins DESC, draws DESC`);
}