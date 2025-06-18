const { pool } = require('../services/database.js');

const getMessagesByGroupId = async (groupId) => {
    const [rows] = await pool.query(
        `SELECT m.*, u.first_name, u.last_name
         FROM messages_ccl2 m
         JOIN users_ccl2 u ON m.user_id = u.id
         WHERE m.group_id = ?
         ORDER BY m.created_at ASC`,
        [groupId]
    );
    return rows;
};

const addMessage = async (groupId, userId, content) => {
    const [result] = await pool.query(
        `INSERT INTO messages_ccl2 (user_id, group_id, name)
         VALUES (?, ?, ?)`,
        [userId, groupId, content]
    );
    return result.insertId;
};

const deleteMessage = async (messageId) => {
    const [result] = await pool.query(
        'DELETE FROM messages_ccl2 WHERE id = ?',
        [messageId]
    );
    return result;
};

module.exports = {
    getMessagesByGroupId,
    addMessage,
    deleteMessage
};