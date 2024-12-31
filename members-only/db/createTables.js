#! /usr/bin/env node
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const {Client} = pg;

const createTables = `
    CREATE TABLE IF NOT EXISTS users (
        id serial primary key not null,
        first_name varchar(255) not null,
        last_name varchar(255) not null,
        username varchar(255) not null,
        password varchar(255) not null,
        email varchar(255),
        membership boolean not null,
        admin boolean not null
    );

    CREATE TABLE IF NOT EXISTS messages (
        id serial primary key not null,
        title varchar(255) not null,
        text varchar(255) not null,
        timestamp date not null,
        user_id integer not null references users(id) on delete cascade
    );
`;

async function main() {
    try {
        console.log("Creating tables in the database...");

        // connection string -> postgresql://user:pass@5432/database
        const client = new Client({
            connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        });

        await client.connect();
        await client.query(createTables);
        await client.end();

        console.log("Tables created.");
    } catch (error) {
        console.log(error);
    }
}

main();