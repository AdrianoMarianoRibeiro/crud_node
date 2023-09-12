import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {

    #videos = new Map();

    async create(video) {

        const { title, description, duration } = video;

        await sql`INSERT INTO videos (title, description, duration) VALUES (${title}, ${description}, ${duration})`;
    }

    async update(id, video) {

        const { title, description, duration } = video;

        await sql`UPDATE VIDEOS SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
     }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`; 
    }

    async list(search) {

        const videos = await (search) ? sql`SELECT * FROM videos WHERE title ILIKE ${'%'+search+'%'} ORDER BY id ASC` : sql`SELECT * FROM videos ORDER BY id ASC`;

        return videos;
    }
}