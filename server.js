// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hello world');
//     return response.end();
// });

// server.listen(3333);

// ----------------------------------------------------------

import { fastify } from 'fastify';

import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;
    await database.create({
        title,
        description,
        duration
    });

    return reply.status(201).send();
});

server.get('/videos', async (request) => {
    const search = request.query.search;
    const videos = await database.list(search);

    return videos;
});

server.put('/videos/:id', (request, reply) => {
    const id = request.params.id;
    const { title, description, duration } = request.body;
    database.update(id, {
        title,
        description,
        duration
    })

    return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {
    const id = request.params.id;
    database.delete(id)
    return reply.status(204).send();
});

server.listen({
    port: 3333
});
