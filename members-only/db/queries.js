import pool from "./pool.js";

/*

    ===== USERS =====

*/

// insert user
async function insertUser(user) {
    console.log("Creating user...");

    try {
        await pool.query(`
                insert into users(first_name, last_name, username, password, email, membership, admin)
                values($1, $2, $3, $4, $5, false, false);
            `, [
                user.firstName,
                user.lastName,
                user.username,
                user.password,
                user.email
            ]);
    } catch (error) {
        console.log(error);
    }

    console.log("User created!");
}

// find username
async function findUsername(username) {
    console.log(`Searching username: ${username}...`);
    
    const { rows } = await pool.query(`
            select * from users
            where username = $1;
        `, [username]);

    return rows;
}

// find email
async function findUserEmail(email) {
    console.log(`Searching e-mail: ${email}...`);

    const { rows } = await pool.query(`
            select * from users
            where email = $1;
        `, [email]);

    return rows;
}

// find user by ID
async function findUserById(ID) {
    console.log(`Searching ID: ${ID}...`);

    const { rows } = await pool.query(`
            select * from users
            where id = $1;
        `, [ID]);

    return rows;
}

// user gets membership
async function assignMembership(user) {
    await pool.query(`
        UPDATE users
        SET membership = true
        WHERE id = $1;
        `, [user.id]);
    console.log(`User ${user.username} has become a member.`);
}

// user becomes admin
async function assignAdmin(user) {
    await pool.query(`
        UPDATE users
        SET admin = true
        WHERE id = $1;
        `, [user.id]);
    
    console.log(`User ${user.username} has become admin.`);
}

/*

    ===== MESSAGES =====

*/
// gets all messages from database
async function getAllMessagesOrderedDesc() {
    console.log("Retrieving all messages...");
    
    try {
        const { rows } = await pool.query(`
            SELECT messages.id, title, text, timestamp, users.username FROM messages
            JOIN users ON messages.user_id = users.id
            ORDER BY messages.id DESC;
        `);

        console.log("Done.");
        return rows;
    } catch (error) {
        console.log(error);
    }

}

// inserts message into database
async function insertMessage(message) {
    console.log("Saving message...");

    try {
        await pool.query(`
                insert into messages(title, text, timestamp, user_id)
                values ($1, $2, $3, $4);
            `, [
                message.title,
                message.text,
                message.timestamp,
                message.user_id
            ]);
    } catch (error) {
        console.log(error);
    }

    console.log("Message saved.");
}

// delete a message by ID
async function deleteMessage(id) {
    console.log(`Deleting message with ID ${id}...`);
    try {
        await pool.query(`
            DELETE FROM messages
            WHERE id = $1;
            `, [id]);
    } catch (error) {
        console.log(error);
    }
    console.log("Deleted");
}

export default {
    insertUser,
    findUsername,
    findUserEmail,
    findUserById,
    assignMembership,
    assignAdmin,
    getAllMessagesOrderedDesc,
    insertMessage,
    deleteMessage,
}