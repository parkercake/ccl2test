const db = require('../services/database');

const getMessagesByGroupId = (groupId) => new Promise((resolve, reject) => {
    db.query(
        `SELECT m.*, u.first_name, u.last_name
         FROM messages_ccl2 m
         JOIN users_ccl2 u ON m.user_id = u.id
         WHERE m.group_id = ?
         ORDER BY m.created_at ASC`,
        [groupId],
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        }
    );
});

const addMessage = (groupId, userId, content) => new Promise((resolve, reject) => {
    db.query(
        `INSERT INTO messages_ccl2 (user_id, group_id, name)
         VALUES (?, ?, ?)`,
        [userId, groupId, content],
        (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        }
    );
});

const deleteMessage = (messageId) => new Promise((resolve, reject) => {
    db.query(
        'DELETE FROM messages_ccl2 WHERE id = ?',
        [messageId],
        (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }
    );
});

module.exports = {
    getMessagesByGroupId,
    addMessage,
    deleteMessage
};
