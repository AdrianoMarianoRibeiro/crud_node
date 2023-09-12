import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    #videos = new Map();

    create(video) {
        const id = randomUUID();
        this.#videos.set(id, video);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videosArray) => {
            const id   = videosArray[0];
            const data = videosArray[1];

            return {
                id, 
                ...data
            }
        }).filter(video => {
            return (search) ? video.title.includes(search) : true;
        });
    }
}