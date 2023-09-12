
import { sql } from './db.js';

sql`CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(10) NOT NULL,
    description VARCHAR(20),
    duration INTEGER
  );`.then(() => {
    console.log('Tabela criada com sucesso!');
  });
